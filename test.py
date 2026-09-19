from pdf2docx import Converter

cv = Converter("sample.pdf")
cv.convert("sample.docx")
cv.close()