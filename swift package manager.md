# -Swift-package-manager
Swift package manager done the easy way.



//Step 1 : Use the swift package init command to create a new Swift package. This will create a new directory with the name of your package and a basic directory structure for your project. For example, if you want to create a package called "MyPackage", you would enter the following command

![image](https://user-images.githubusercontent.com/127158314/227667486-16280d9e-d606-491b-827e-69a9ca9b58a1.png)

This will create a new directory called "MyPackage" with the following structure 
![image](https://user-images.githubusercontent.com/127158314/227667613-4078719c-2eac-44fc-b9e9-79edb630a56c.png)

// Step 2 : Open the Package.swift file in your text editor of choice. This file describes your package and its dependencies. Here's an example Package.swift file for a simple package

![image](https://user-images.githubusercontent.com/127158314/227667783-173bfa31-7910-437c-a64f-ee7700aea462.png)

//step 3 : This Package.swift file declares a single product, an executable called "MyPackage", and a single target with the same name. It also declares a test target, which depends on the main target. If you need to add dependencies to your package, you can add them to the dependencies array.

Open the Sources/MyPackage/main.swift file in your text editor of choice. This file contains the entry point for your executable. Here's an example main.swift file for a simple "Hello, World!" program

![image](https://user-images.githubusercontent.com/127158314/227668055-0b22ac85-d166-41e5-b762-80c9f54cdba2.png)

//Step 4 :  Build and run your package using the swift run command

![image](https://user-images.githubusercontent.com/127158314/227668469-023a7df3-d4e1-4068-bea0-34c6addcd8e5.png)
