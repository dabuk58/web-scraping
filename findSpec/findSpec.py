import subprocess
import shutil
import os
import nbformat
from nbconvert import PythonExporter
from IPython.display import display, HTML

webName1 = 'https://www.znanylekarz.pl/'
webName2 = 'https://znajdzlekarza.abczdrowie.pl/'
webName3 = 'https://centrum.med.pl/znajdz-lekarza/'
webName4 = 'https://lekarzebezkolejki.pl/#0'


def createResultFolder():
    folder_path = "result"
    if os.path.exists(folder_path):
        try:
         shutil.rmtree(folder_path)
        except Exception as e:
         print(f"Błąd podczas usuwania folderu {folder_path}: {e}")
    else:
     print(f"Folder o ścieżce {folder_path} nie istnieje.")
    os.mkdir(folder_path)

def compareHtml():
   #compare html files
    for i in range(numberOfInputElements):
     fileBefore = 'result/before/before.txt'
     fileAfter = f"result/after/{i}.txt"
     fileDiff = f"result/{i}.txt"
     command = ['python', 'findSpec/compare.py', fileBefore, fileAfter, fileDiff]
     subprocess.call(command)

def useModel(fileName):
   command = ['python', 'findSpec/model.py', f'result/{fileName}.txt']
   subprocess.call(command)
   with open('wynik.txt', 'r') as result_file:
        count_specializations_result = int(result_file.read())

   #print(f"Liczba predykcji powyżej 0.4: {count_specializations_result}")
   return count_specializations_result

def findSpecBySelect(webName):
   readSelect(webName)
   return useModel('fromSelect')


def readSelect(webName):
   js_file = "inputHtmlDiff/index.js"
   command = ["node", js_file, webName]
   subprocess.run(command, capture_output=True, text=True)

def readInput(webName):
   js_file = "inputHtmlDiff/index2.js"
   command = ["node", js_file, webName]
   result = subprocess.run(command, capture_output=True, text=True)
   return int(result.stdout.strip())

def findAllSpecFromInput(webName, input_id):
   js_file = "findSpec/getInputSpec.js"
   command = ["node", js_file, webName, str(input_id)]
   result = subprocess.run(command, capture_output=True, text=True)

#######################################################################
webName = webName3

#search selects
count_specializations_result = findSpecBySelect(webName)
if count_specializations_result>5:
   print(f"Usługi w select: {count_specializations_result}")

#search inputs
else:
   createResultFolder()
   numberOfInputElements = readInput(webName)
   compareHtml()

#use model to find specializations input
   count_specializations =0
   input_id = 0
   for i in range(numberOfInputElements):
       count_specializations_result = useModel(i) 
       print(f"\n\nInputId/countSpec: {i} / {count_specializations_result}\n")
       if count_specializations_result > count_specializations:
        count_specializations = count_specializations_result
        input_id=i
        

   #findAllSpecFromInput(webName, input_id)
