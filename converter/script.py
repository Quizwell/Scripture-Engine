# Import the required libraries
import re
import json

# Get the input from input.txt
with open('input.txt', 'r') as f:
    input_text = f.read()

# Create a regular expression for "# ", where # is a number
regex = re.compile(r'\d+ ')

# Split the string at every occurence of the regular expression
split_text = regex.split(input_text)

# Remove the empty string at the start of the list
if split_text[0] == '':
    split_text = split_text[1:]

# Output the result to output.json as a JSON array
with open('output.json', 'w') as f:
    json.dump(split_text, f, ensure_ascii=False)
