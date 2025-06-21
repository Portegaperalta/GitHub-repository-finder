const body = document.querySelector('body')
const darkModeBtn = document.querySelector('#toggleDarkModeBtn')

const languageMenu = document.querySelector('#languageSelect')
const contentDisplayBox = document.querySelector('#contentDisplayBox')
const contentDisplayBoxTitle = document.querySelector('#contentDisplayBox h2')

const refreshBtn = document.querySelector('#refreshBtn')
const retryBtn = document.querySelector('#retryBtn')

const languages = ["JavaScript", "Python", "C", "C++", "Ruby", "Java", "Go"]

// Get random repository function

const getRandomRepoByLang = async (lang) => {

  try {
    const config = { headers: { Accept: 'application/vnd.github+json' } }
    const res = await axios.get(`https://api.github.com/search/repositories?q=${lang}`, config)
    const filteredRepos = res.data.items.filter(repo => repo.language === lang)
    const randomRepo = filteredRepos[Math.floor(Math.random() * 16)]

    //creating elements to add to dom

    const newRepoTitle = document.createElement('a')
    const newRepoDescription = document.createElement('p')
    const repoInfoDiv = document.createElement('div')
    const newRepoStars = document.createElement('p')
    const newRepoForks = document.createElement('p')
    const newRepoWatchers = document.createElement('p')

    //asigning value to elements

    newRepoTitle.innerText = randomRepo.full_name
    newRepoTitle.href = randomRepo.html_url
    newRepoTitle.target = '_blank'
    newRepoDescription.innerText = randomRepo.description.slice(0, 100)
    newRepoStars.innerHTML = `<p><i class="fa-solid fa-star repoStar"></i>${randomRepo.stargazers_count}</p>`
    newRepoForks.innerHTML = `<p><i class="fa-solid fa-code-fork"></i>${randomRepo.forks}</p>`
    newRepoWatchers.innerHTML = `<p><i class="fa-solid fa-eye"></i>${randomRepo.watchers_count}</p>`

    //appending elements to dom 
    contentDisplayBox.append(newRepoTitle)
    contentDisplayBox.append(newRepoDescription)
    contentDisplayBox.append(repoInfoDiv)
    repoInfoDiv.append(newRepoStars)
    repoInfoDiv.append(newRepoForks)
    repoInfoDiv.append(newRepoWatchers)

    //adding classes to elements
    newRepoTitle.classList.add('repo-title')
    newRepoDescription.classList.add('repo-description')
    repoInfoDiv.classList.add('repo-info')
    newRepoStars.classList.add('repo-info-data')
    newRepoForks.classList.add('repo-info-data')
    newRepoWatchers.classList.add('repo-info-data')
  }
  catch (error) {
    console.log(`Error: ${error}`)
  }
}

// Select menu event listener

languageMenu.addEventListener('click', (e) => {
  const selectedLang = e.target.value
  if (languages.includes(selectedLang)) {

    contentDisplayBoxTitle.classList.add('hidden')
    contentDisplayBox.innerHTML = ''
    contentDisplayBox.style.backgroundColor = 'white'
    contentDisplayBox.style.border = "2px solid black"

    refreshBtn.classList.remove('hidden')

    getRandomRepoByLang(e.target.value)
  }
})

//refresh button event listener

refreshBtn.addEventListener('click', () => {
  const selectedLang = languageMenu.value
  if (languages.includes(selectedLang)) {
    contentDisplayBox.innerHTML = ''
    getRandomRepoByLang(selectedLang)
  }
})
