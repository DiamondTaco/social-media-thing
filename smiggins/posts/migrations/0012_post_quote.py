# Generated by Django 5.0.2 on 2024-04-14 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0011_user_gradient'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='quote',
            field=models.IntegerField(default=0),
        ),
    ]
