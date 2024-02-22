def useModel(fileName):
   command = ['python', 'findSpec/model.py', f'result/{fileName}.txt']
   subprocess.call(command)
   with open('wynik.txt', 'r') as result_file:
        count_specializations_result = int(result_file.read())

   return count_specializations_result