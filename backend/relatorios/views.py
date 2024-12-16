from django.http import HttpResponse
from rest_framework.views import APIView
from reportlab.platypus import Table, TableStyle
from reportlab.pdfgen import canvas
from vendas.models import Venda
from reportlab.lib.pagesizes import letter
from datetime import datetime
from reportlab.lib import colors

# Create your views here.
class PDFView(APIView):
    def get(self, request, *args, **kwargs):
        # Obter parâmetros de data do request
        data_inicio = request.query_params.get('data_inicio', None)
        data_fim = request.query_params.get('data_fim', None)

        # Filtrar vendas pelo período informado
        vendas = Venda.objects.all()
        if data_inicio and data_fim:
            try:
                data_inicio = datetime.strptime(data_inicio, '%Y-%m-%d')
                data_fim = datetime.strptime(data_fim, '%Y-%m-%d')
                vendas = vendas.filter(created_at__date__gte=data_inicio, created_at__date__lte=data_fim)
            except ValueError:
                return HttpResponse("Datas inválidas. Use o formato YYYY-MM-DD.", status=400)

        # Configuração do arquivo PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename="relatorio_vendas.pdf"'
        pdf = canvas.Canvas(response, pagesize=letter)
        width, height = letter

        # Cabeçalho
        pdf.setFont("Helvetica-Bold", 14)
        pdf.drawString(50, height - 50, "Relatório de Vendas")

        # Montar a tabela de vendas
        data = [["ID", "Cliente", "Valor Total", "Data"]]
        for venda in vendas:
            data.append([
                venda.id,
                venda.cliente.nome,
                f"R$ {venda.valor_total:.2f}",
                venda.created_at.strftime('%d/%m/%Y') if venda.created_at else "-"
            ])

        # Estilo da tabela
        table = Table(data, colWidths=[50, 200, 100, 100])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))

        # Adicionar tabela ao PDF
        table.wrapOn(pdf, width, height)
        table.drawOn(pdf, 50, height - 200)

        # Finalizar PDF
        pdf.showPage()
        pdf.save()

        return response