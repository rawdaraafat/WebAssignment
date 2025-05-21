@echo off
echo Creating virtual environment...
python -m venv venv
call venv\Scripts\activate

echo Installing Django...
pip install django

echo Installing django-crispy-forms...
pip install django-crispy-forms

echo Installing crispy-bootstrap5...
pip install crispy-bootstrap5

echo Installing Pillow...
pip install Pillow

echo Running migrations...
python manage.py migrate

echo Setup complete! You can now run the development server with 'python manage.py runserver'. 