#!/bin/bash

# Get the current directory where the script is located
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Define the images directory relative to the script's location
IMAGES_DIR="$SCRIPT_DIR/images"

# Define the output JSON file path
OUTPUT_JSON_FILE="$SCRIPT_DIR/imagesList.json"

# Initialize an empty JSON string
PROJECTS_JSON="{"

# Loop through each directory inside the images directory (projects)
for PROJECT_DIR in "$IMAGES_DIR"/*/; do
    if [ -d "$PROJECT_DIR" ]; then
        PROJECT_NAME=$(basename "$PROJECT_DIR")
        
        # Get all image files in the current project directory (JPG, JPEG, PNG, GIF, BMP) - case insensitive
        IMAGE_FILES=()
        for IMAGE_FILE in "$PROJECT_DIR"/*.{jpg,jpeg,png,gif,bmp,JPG,JPEG,PNG,GIF,BMP}; do
            if [ -f "$IMAGE_FILE" ]; then
                IMAGE_FILES+=("\"$(basename "$IMAGE_FILE")\"")  # Add quotes around each filename
            fi
        done
        
        # Skip empty directories (if no image files are found)
        if [ ${#IMAGE_FILES[@]} -gt 0 ]; then
            # Create a JSON array of filenames (separate them by commas)
            IMAGE_LIST=$(IFS=,; echo "${IMAGE_FILES[*]}")  # Correctly join filenames with commas
            PROJECTS_JSON+="\"$PROJECT_NAME\":[${IMAGE_LIST}],"
        fi
    fi
done

# Remove the last comma if the JSON is not empty
PROJECTS_JSON="${PROJECTS_JSON%,}}"

# Write the JSON content to the file (overwrite if it exists)
echo "$PROJECTS_JSON" > "$OUTPUT_JSON_FILE"

echo "Images list JSON file generated/updated at: $OUTPUT_JSON_FILE"
