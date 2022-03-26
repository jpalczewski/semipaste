# Generated by Django 4.0.3 on 2022-03-19 18:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pastes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pastebin',
            name='date_of_expiry',
            field=models.DateTimeField(null=True, verbose_name='date of expiry'),
        ),
        migrations.AlterModelOptions(
            name='pastebin',
            options={'ordering': ['id'], 'verbose_name': 'pastebin', 'verbose_name_plural': 'pastebins'},
        ),
        migrations.AlterField(
            model_name='pastebin',
            name='date_of_creation',
            field=models.DateTimeField(verbose_name='date of creation'),
        ),
        migrations.AlterField(
            model_name='pastebin',
            name='expire_after',
            field=models.CharField(
                choices=[('NEVER', 'never'), ('HOUR', '1 hour'), ('DAY', '1 day'), ('WEEK', '1 week'),
                         ('MONTH', '1 month'), ('YEAR', '1 year')], default='NEVER', max_length=5,
                verbose_name='expire after'),
        ),
        migrations.RenameField(
            model_name='pastebin',
            old_name='paste_text',
            new_name='text',
        ),
        migrations.AddField(
            model_name='pastebin',
            name='author',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE,
                                    to=settings.AUTH_USER_MODEL, verbose_name='author'),
        ),
        migrations.AlterField(
            model_name='pastebin',
            name='date_of_creation',
            field=models.DateTimeField(blank=True, verbose_name='date of creation'),
        ),
        migrations.AlterField(
            model_name='pastebin',
            name='date_of_expiry',
            field=models.DateTimeField(blank=True, null=True, verbose_name='date of expiry'),
        ),
    ]
