const APIURL = "https://api.github.com/users/ernaneJ";
let user;
let repositories;
const GithubData = async ()=>{
    const resp = await fetch(APIURL);
    const respData = await resp.json();

    const repos = await fetch(APIURL+"/repos");
    const reposData = await repos.json();

    user = respData;
    repositories = reposData;
};GithubData();

const textArea = document.getElementById('textArea');
const main = document.getElementById('main');
let respData;

main.innerHTML = "Last login: Thursday May 20 13:27:02 on console";
document.body.addEventListener('keypress', e => {
    const keyName = e.key;
    if(keyName == 'Enter'){
        e.preventDefault();
        const text = textArea.value;
        exec(text);
        textArea.value = '';
        main.scrollTop = main.scrollHeight;
    }
  });

let r=0;
function exec(action){
    let element = document.createElement('div');
    element.innerHTML = "Ernane:~ Web-Terminal$ "+action+"<br>";
    main.appendChild(element);
    switch (action.toLowerCase()) {
        case "clear":
            main.innerHTML = '';
            break;
        case "projects":
            const projects = document.createElement("div");
            projects.classList.add('projects');
            main.appendChild(projects);
            repositories
                .forEach((rep, index) => {
                    if(rep.description && (index==5 || index==2 ||index==8 ||index==10 ||index==11 ||index==15 ||index==18 ||index==19 ||index==20 ||index==22)){
                        const repoEl = document.createElement("a");
                        repoEl.href = rep.html_url;
                        repoEl.target="_blank";
                        repoEl.innerHTML = `
                        <h2>${rep.name}</h2><div>${rep.description}</div>`;

                        projects.appendChild(repoEl);
                    }
                });
                const p = document.createElement("p");
                p.style.color="#FD6056";
                p.innerHTML ="<br/>to apply or remove styling use the command 'projects -w -s'<br/> "
                main.appendChild(p);
            break;
        case "projects -w -s":
            document.querySelectorAll('.projects a')
                .forEach(rep => {
                    rep.style.color ="white";
                    rep.classList.toggle('repository');
                });
            break;
        case 'profile':
            const profile = document.createElement("div");
            profile.innerHTML = `
                <div class="about">
                    <div>
                        <a target="_blank" href="${user.html_url}">
                            <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
                        </a>
                    </div>
                    <div class="user-info">
                        <a target="_blank" href="${user.html_url}"><h2>${user.name}</h2></a>
                        <p>${user.bio}</p>
                        <h5>Repositories:</h5>
                        <div id="repos${r}"></div>
                    </div>
                </div>`;

                main.appendChild(profile);

                top10Repositories();
            break;
        case 'help':
            const help = document.createElement("div");
            help.classList.add('help')
            help.innerHTML = `
            <div>
                CLEAR<br/>
                PROJECTS<br/>
                PROFILE<br/>
                CONTACT<br/>
                WEB-TERMINAL --V
            </div>
            <div>
                Clear all screen content <br>
                Shows the top 10 projects from Ernane's profile on github <br>
                Shows a preview of the profile on GitHub.<br>
                Shows contacts like email and cell phone number<br>
                Shows the version of the web terminal
            </div>
            `;
            main.appendChild(help);
            break;
        case "contact":
            const contact = document.createElement("div");
            contact.classList.add('contacts')
            contact.innerHTML = `
                <label>
                    <i class="fas fa-envelope"></i>
                    <b>Email</b>: 
                </label>
                <a href="mailto:ernane.junior25@gmail.com?subject=Hello!!">ernane.junior25@gmail.com</a><br>

                <label>
                    <i class="fas fa-phone-alt"></i> 
                    <b>Phone</b>: 
                </label> 
                <a href=”tel:+5584992207080″>+55 (84) 9 9220 - 7080</a><br/><br/>

                <p>Or if you prefer, check out the social media by <a target="_blank" href="https://ernanej.github.io/my-linktree/">clicking here</a> or by running the command: <span>social media</span></p>
            `;
            main.appendChild(contact);
            break;
        case "social media":
            window.open('https://ernanej.github.io/my-linktree/');
            break;
        case "web-terminal --v":
            const v = document.createElement("div");
            v.innerHTML = `
                v1.0.0
            `;
            main.appendChild(v);
            break;
        default:
        element.innerHTML = `Ernane:~ Web-Terminal$  ${action}<br>'${action}' is not recognized as an internal or external command, an operable program or a batch file.`
        break;
    }
}

function top10Repositories(){
    const reposEl = document.getElementById(`repos${r}`);
    repositories
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");
            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;
            reposEl.appendChild(repoEl);
        });
        r++;
}