import pypdf

reader = pypdf.PdfReader(r'C:\Users\thous\Desktop\Full_Stack_Application\TaskPulse_MERN_Project_Report_Thouseef_F.pdf')
print(f'=== TOTAL PAGES: {len(reader.pages)} ===\n')

empty_pages = []
for i, page in enumerate(reader.pages):
    text = (page.extract_text() or '').strip()
    words = len(text.split())
    chars = len(text)
    preview = text.replace('\n', ' ')[:90]
    num_images = len(page.images)
    
    # Check if empty (ignoring footer string)
    cleaned = text.replace('Dayananda Sagar University • School of Computer Applications', '').strip()
    is_empty = (len(cleaned) < 15) and (num_images == 0)
    
    if is_empty:
        empty_pages.append(i + 1)
        print(f'❌ Page {i+1} [EMPTY]: {chars} chars | {preview}')
    else:
        print(f'✅ Page {i+1}: {words} words, {chars} chars, {num_images} images | {preview}')

print('\n' + '='*50)
if empty_pages:
    print(f'⚠️ Found empty pages: {empty_pages}')
else:
    print('🎉 SUCCESS: No empty or blank pages found in the document!')
