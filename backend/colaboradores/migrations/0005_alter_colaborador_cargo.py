# Generated by Django 4.2.4 on 2024-07-07 16:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('colaboradores', '0004_cargos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='colaborador',
            name='cargo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='colaboradores.cargos'),
        ),
    ]
