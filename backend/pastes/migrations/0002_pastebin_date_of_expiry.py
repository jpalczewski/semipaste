# Generated by Django 4.0.3 on 2022-03-19 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pastes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pastebin',
            name='date_of_expiry',
            field=models.DateTimeField(null=True, verbose_name='date of expiry'),
        ),
    ]
