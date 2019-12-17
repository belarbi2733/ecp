import sys
import json
pyScriptName = sys.argv[0]
djson = json.loads(sys.argv[1])
print(djson)
print(pyScriptName)

for key, value in djson.items():
    print(key, '->',value)
