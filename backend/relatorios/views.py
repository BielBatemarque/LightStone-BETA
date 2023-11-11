from django.http import HttpResponse
from rest_framework.views import APIView
from reportlab.pdfgen import canvas

# Create your views here.
class PDFView(APIView):
    def get(self, request, *args, **kwargs):
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename="relatorio.pdf"'

        # Crie o objeto PDF, usando o objeto HttpResponse como seu "arquivo".
        p = canvas.Canvas(response)

        # Adicione o conteúdo ao PDF aqui. Por exemplo:
        p.drawString(100, 800, "Meu Relatório em PDF")

        # Fecha o objeto PDF e retorna a resposta.
        p.showPage()
        p.save()

        return response