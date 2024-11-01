from flask import Flask, render_template, redirect, url_for, flash
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for flashing messages

# Database configuration for both databases
db_config_appointments = {
    'host': 'localhost',
    'user': 'root',
    'password': 'mukit.2000',
    'database': 'appointment_db',
    'port': 3306  # Adjust if necessary
}

db_config_users = {
    'host': 'localhost',
    'user': 'root',
    'password': 'mukit.2000',
    'database': 'reflex_signup',
    'port': 3306  # Adjust if necessary
}

def create_connection(db_config):
    try:
        connection = mysql.connector.connect(**db_config)
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error: {e}")
        return None

# Route for the root URL
@app.route('/')
def home():
    return redirect(url_for('dashboard'))

# Route for the dashboard
@app.route('/dashboard')
def dashboard():
    # Fetch appointments
    appointments = []
    connection = create_connection(db_config_appointments)
    if connection is None:
        flash("Could not connect to the appointments database.")
    else:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM appointments")
        appointments = cursor.fetchall()
        cursor.close()
        connection.close()

    # Fetch users
    users = []
    connection = create_connection(db_config_users)
    if connection is None:
        flash("Could not connect to the users database.")
    else:
        cursor = connection.cursor()
        cursor.execute("SELECT id, name, email, DATE(created_at) FROM users")
        users = cursor.fetchall()
        cursor.close()
        connection.close()

    return render_template('dashboard.html', appointments=appointments, users=users)

if __name__ == '__main__':
    app.run(debug=True)
