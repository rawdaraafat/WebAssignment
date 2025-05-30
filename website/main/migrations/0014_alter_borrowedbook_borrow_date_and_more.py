# Generated by Django 5.2.1 on 2025-05-19 08:21

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_borrowedbook_userprofile_borrowed_books'),
    ]

    operations = [
        migrations.AlterField(
            model_name='borrowedbook',
            name='borrow_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='borrowedbook',
            name='due_date',
            field=models.DateTimeField(),
        ),
    ]
