# Generated by Django 4.0.3 on 2022-04-10 16:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pastes', '0007_pastebin_language'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attachment',
            name='paste',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attachments', to='pastes.pastebin'),
        ),
    ]