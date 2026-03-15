#!/usr/bin/env python3
"""Extract images from Word documents"""
import os
import zipfile
import shutil

# Years to process
years = range(2010, 2026)

for year in years:
    docx_file = f'kanguru/kaenguru{year}_questions_with_sections.docx'

    if not os.path.exists(docx_file):
        print(f"Skipping {year} - file not found")
        continue

    # Create year directory
    year_dir = f'images/{year}'
    os.makedirs(year_dir, exist_ok=True)

    # Extract images from docx (which is a zip file)
    try:
        with zipfile.ZipFile(docx_file, 'r') as zip_ref:
            # Get all image files
            image_files = [f for f in zip_ref.namelist() if f.startswith('word/media/')]

            print(f"{year}: Found {len(image_files)} images")

            # Extract each image
            for i, img_file in enumerate(image_files, 1):
                # Get file extension
                ext = os.path.splitext(img_file)[1]

                # Extract and rename
                source = zip_ref.open(img_file)
                target_name = f'{year_dir}/image{i}{ext}'

                with open(target_name, 'wb') as target:
                    shutil.copyfileobj(source, target)

    except Exception as e:
        print(f"Error processing {year}: {e}")

print("\nImage extraction complete!")
