from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import json

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Load knowledge base
with open('knowledge_base.json') as f:
    knowledge_base = json.load(f)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    student_id = db.Column(db.String(20), unique=True, nullable=False)
    department = db.Column(db.String(50), nullable=False)

class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

# Routes
@app.route('/')
def home():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/settings')
def settings():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    # Get user information
    user = User.query.get(session['user_id'])
    
    return render_template('settings.html', user_name=session['user_name'], user=user)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            session['user_name'] = user.name
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid email or password', 'error')
    
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        student_id = request.form['student_id']
        department = request.form['department']
        
        if password != confirm_password:
            flash('Passwords do not match', 'error')
            return redirect(url_for('register'))
        
        if User.query.filter_by(email=email).first():
            flash('Email already registered', 'error')
            return redirect(url_for('register'))
        
        if User.query.filter_by(student_id=student_id).first():
            flash('Student ID already registered', 'error')
            return redirect(url_for('register'))
        
        hashed_password = generate_password_hash(password, method='sha256')
        
        new_user = User(
            name=name,
            email=email,
            password=hashed_password,
            student_id=student_id,
            department=department
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        flash('Registration successful! Please login.', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    return render_template('dashboard.html', user_name=session['user_name'])

@app.route('/chat', methods=['POST'])
def chat():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    user_message = request.json['message']
    response = get_chatbot_response(user_message)
    
    # Save to chat history
    chat = ChatHistory(
        user_id=session['user_id'],
        message=user_message,
        response=response
    )
    db.session.add(chat)
    db.session.commit()
    
    return jsonify({'response': response})

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

def get_chatbot_response(message):
    message = message.lower().strip()
    
    # Check for direct matches
    for item in knowledge_base:
        if message in item['questions']:
            return item['answer']
    
    # Check for keyword matches
    for item in knowledge_base:
        for keyword in item['keywords']:
            if keyword in message:
                return item['answer']
    
    # Default response
    return "I'm sorry, I don't have information about that. Please contact the campus help desk for more assistance."

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)