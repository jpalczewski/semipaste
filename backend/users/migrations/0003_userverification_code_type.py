# Generated by Django 4.0.3 on 2022-04-06 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_user_is_verified_alter_user_description_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="userverification",
            name="code_type",
            field=models.TextField(default="token", verbose_name="code type"),
            preserve_default=False,
        ),
    ]
