import subprocess
import shutil
import os

webName1 = 'https://www.znanylekarz.pl/'
webName2 = 'https://znajdzlekarza.abczdrowie.pl/'
webName3 = 'https://centrum.med.pl/znajdz-lekarza/'
webName4 = 'https://lekarzebezkolejki.pl/'

def removeTmpFiles():
   current_folder = os.getcwd()
   for filename in os.listdir(current_folder):
        if filename.startswith("cleared") or filename.startswith("specFromInput"):
            file_path = os.path.join(current_folder, filename)
            try:
                os.remove(file_path)
            except Exception as e:
                print(f"Błąd podczas usuwania pliku {file_path}: {e}")

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
     fileBefore = f"result/before/{i}.txt"
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
   subprocess.run(command, capture_output=True, text=True)
  
   count_specializations_result = useScript(f'result/spec/olog.txt', '-olog') 
   count_specializations_result = useScript(f'result/spec/atra.txt', '-atra') 



def useScript(file_name, input_id):
   command = ['python', 'findSpec/findSpecBySuffix.py', str(file_name), str(input_id)]
   subprocess.call(command)
   with open('wynik.txt', 'r') as result_file:
        count_specializations_result = int(result_file.read())

   print(f"Suffix dla {input_id}: {count_specializations_result}")
   return count_specializations_result

def findSpecInput():
   count_specializations =0
   input_id = 0
   for i in range(numberOfInputElements):
       count_specializations_result = useScript(f'result/{input_id}.txt', i) 
       print(f"\n\nInputId/countSpec: {i} / {count_specializations_result}\n")
       if count_specializations_result > count_specializations:
        count_specializations = count_specializations_result
        input_id=i  
   return input_id

#######################################################################
webName = webName1
removeTmpFiles()

#search selects
count_specializations_result = findSpecBySelect(webName)
if count_specializations_result>5:
   print(f"Usługi w select: {count_specializations_result}")

#search inputs
else:
   createResultFolder()
   numberOfInputElements = readInput(webName)
   compareHtml()

   input_id = findSpecInput()      
   findAllSpecFromInput(webName, input_id)
