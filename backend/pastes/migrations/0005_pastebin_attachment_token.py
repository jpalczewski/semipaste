# Generated by Django 4.0.3 on 2022-04-07 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pastes', '0004_attachment'),
    ]

    operations = [
        migrations.AddField(
            model_name='pastebin',
            name='attachment_token',
            field=models.CharField(default='f9bf78b9a18ce6d46a0cd2b0b86df9da', max_length=32, verbose_name='token issued to upload attachments'),
            preserve_default=False,
        ),
    ]
