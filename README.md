hi ai <3

can do Admin Panel UI as prio — same theme aesthetic as homepage natin (same tailwind styling, spacing, soft shadows, minimal elegant clean UI).

Branch ng main na finalized changes is *main* , 
- when we make something new that might affect the whole program, we make a new branch (check **2. Checkout feature branch to work on**) para hiwalay and unaffected original files
- pag for sure nagana without affecting other files, can do **5. Commit**
- if may gusto u tignan na other branch /features can do **6. Switch branches** pero need mo muna icommit and save changes mo para di mawala


## Setup Instructions (Windows Dev Env)

Open terminal/cmd prompt

### 1. Clone repo
cd Documents 

git clone https://github.com/eryni/dog-eat-dog.git

cd dog-eat-dog/Frontend/pets-ui


### 2. Checkout feature branch to work on
git checkout -b ai-ui-admin-panel


### 3. Install Dependencies then Run Server
cd Frontend\pets-ui
npm install
ng serve

App opens at:
http://localhost:4200

### 4. Backend (not needed yet)
cd Backend\ITS181-2_GRP9
mvn clean install 
mvn spring-boot:run

### 5. Want to save progress? Commit 
git add . 
git commit -m "description of what changes"
git push 

### 6. Want to check other features/branches? Switch
git fetch --all
git branch -a
git checkout <branch-name-without-angle-brackets>


---

## Notes for Admin Panel UI Task

- same theme ng home page ni ange
- List of pets up for adoption
- Create add delete record ng pet
