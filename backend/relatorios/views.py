from django.http import HttpResponse
from rest_framework.views import APIView
from reportlab.platypus import Table, TableStyle, Paragraph, SimpleDocTemplate
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from datetime import datetime
from vendas.models import Venda
from orcamentos.models import Orcamento
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

        # Criar resposta HTTP com conteúdo PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename="relatorio_vendas.pdf"'
        doc = SimpleDocTemplate(response, pagesize=letter)
        elements = []
        styles = getSampleStyleSheet()

        # Cabeçalho
        titulo = Paragraph("<b>Marmoraria Porto Bello</b>", styles['Title'])
        data_emissao = Paragraph(f"Data e hora da emissão: {datetime.now().strftime('%d/%m/%Y %H:%M')}", styles['Normal'])
        periodo = Paragraph(f"Vendas de {data_inicio.strftime('%d/%m/%Y')} a {data_fim.strftime('%d/%m/%Y')}" if data_inicio and data_fim else "Vendas Registradas", styles['Heading2'])

        elements.extend([titulo, data_emissao, periodo])

        # Criar a tabela com os dados das vendas
        data = [["Código", "Cliente", "Itens", "Valor", "Data"]]
        for venda in vendas:
            if not venda.orcamento: continue

            itens = "\n".join([f"{item.nome} - {item.quantidade_metros} m²" for item in venda.orcamento.pecas.all()])
            data.append([
                venda.id,
                venda.cliente.nome,
                itens,
                f"R$ {venda.valor_total:.2f}",
                venda.created_at.strftime("%d/%m/%Y")
            ])

        # Estilizar a tabela
        table = Table(data, colWidths=[50, 100, 200, 80, 80])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))

        elements.append(table)
        doc.build(elements)
        return response


class PDFOrcamentoView(APIView):
    def get(self, request, *args, **kwargs):
        # Obter parâmetros de data do request
        data_inicio = request.query_params.get('data_inicio', None)
        data_fim = request.query_params.get('data_fim', None)

        # Filtrar orçamentos pelo período informado
        orcamentos = Orcamento.objects.all()
        if data_inicio and data_fim:
            try:
                data_inicio = datetime.strptime(data_inicio, '%Y-%m-%d')
                data_fim = datetime.strptime(data_fim, '%Y-%m-%d')
                orcamentos = orcamentos.filter(created_at__date__gte=data_inicio, created_at__date__lte=data_fim)
            except ValueError:
                return HttpResponse("Datas inválidas. Use o formato YYYY-MM-DD.", status=400)

        # Criar resposta HTTP com conteúdo PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename="relatorio_orcamentos.pdf"'
        doc = SimpleDocTemplate(response, pagesize=letter)
        elements = []
        styles = getSampleStyleSheet()

        # Cabeçalho
        titulo = Paragraph("<b>Marmoraria Porto Bello</b>", styles['Title'])
        data_emissao = Paragraph(f"Data e hora da emissão: {datetime.now().strftime('%d/%m/%Y %H:%M')}", styles['Normal'])
        periodo = Paragraph(f"Orçamentos de {data_inicio.strftime('%d/%m/%Y')} a {data_fim.strftime('%d/%m/%Y')}" if data_inicio and data_fim else "Orçamentos Registrados", styles['Heading2'])

        elements.extend([titulo, data_emissao, periodo])

        # Criar a tabela com os dados dos orçamentos
        data = [["Código", "Cliente", "Descrição", "Valor Total", "Data"]]
        for orcamento in orcamentos:
            descricao = "\n".join([f"{item.nome} - {item.quantidade_metros} m² -  {item.descrição}" for item in orcamento.pecas.all()])
            data.append([
                orcamento.id,
                orcamento.cliente.nome,
                descricao,
                f"R$ {orcamento.valor_total:.2f}",
                orcamento.created_at.strftime("%d/%m/%Y")
            ])

        # Estilizar a tabela
        table = Table(data, colWidths=[50, 100, 200, 80, 80])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))

        elements.append(table)
        doc.build(elements)
        return response
