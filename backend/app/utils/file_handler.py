import pdfplumber;

def extract_pdf_text():
    text = '';
    with pdfplumber.open('') as pdf:
        