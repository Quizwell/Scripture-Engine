# Import the required libraries
import re
import json

# Get the input from input.txt
with open('input.txt', 'r') as f:
    input = f.read()

# Create a regular expression for "[#] ", where # is a number
regex = re.compile(r'\[\d+\] ')

# Split the string at every occurence of the regular expression
input = regex.split(input)

# Replace any \ unicode quotation marks with smart start and end quotes
input = [i.replace('\u201c', '“').replace('\u201d', '”') for i in input]
input = [i.replace('\u2018', '‘').replace('\u2019', '’') for i in input]

# Output the result to output.json as a JSON array
with open('output.json', 'w') as f:
    json.dump(input, f)
