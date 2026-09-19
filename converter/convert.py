import sys
from pdf2docx import Converter

pdf_path, docx_path = sys.argv[1], sys.argv[2]

try:
    cv = Converter(pdf_path)
    cv.convert(docx_path)
    cv.close()
except Exception as e:
    print(str(e), file=sys.stderr)
    sys.exit(1)