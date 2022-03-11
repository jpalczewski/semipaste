# Generated by Django 4.0.2 on 2022-03-10 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PasteBin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='title')),
                ('paste_text', models.TextField(verbose_name='paste text')),
                ('date_of_creation', models.DateTimeField(auto_now_add=True, verbose_name='date of creation')),
                ('exposure', models.BooleanField(verbose_name='exposure')),
                ('expire_after', models.CharField(choices=[('NEVER', 'never'), ('HOUR', '1 hour'), ('DAY', '1 day'), ('WEEK', '1 week'), ('YEAR', '1 year')], default='NEVER', max_length=5, verbose_name='expire after')),
            ],
            options={
                'verbose_name': 'Paste Bin',
                'verbose_name_plural': 'Paste Bins',
            },
        ),
    ]