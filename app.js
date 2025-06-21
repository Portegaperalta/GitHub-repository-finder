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
    console.log(randomRepo)

    //creating elements to add to dom

    const newRepoTitle = document.createElement('h3')
    const newRepoDescription = document.createElement('p')

    const repoInfoDiv = document.createElement('div')
    const newRepoLang = document.createElement('p')
    const newRepoStars = document.createElement('p')
    const newRepoForks = document.createElement('p')
    const newRepoWatchers = document.createElement('p')

    const secondInfoDiv = document.createElement('div')
    const newStarsIcon = document.createElement('i')
    const newForksIcon = document.createElement('i')
    const newWatchersIcon = document.createElement('i')

    //asigning value to elements

    newRepoTitle.innerText = randomRepo.full_name
    newRepoDescription.innerText = randomRepo.description.slice(0, 50)
    newRepoLang.innerText = randomRepo.language
    newRepoStars.innerText = randomRepo.stargazers_count
    newRepoForks.innerText = randomRepo.forks
    newRepoWatchers.innerText = randomRepo.watchers_count


    //appending elements to dom 
    contentDisplayBox.append(newRepoTitle)
    contentDisplayBox.append(newRepoDescription)
    contentDisplayBox.append(repoInfoDiv)
    repoInfoDiv.append(newRepoLang)
    repoInfoDiv.append(newRepoStars)
    repoInfoDiv.append(newRepoForks)
    repoInfoDiv.append(newRepoWatchers)

    //adding classes to elements

    repoInfoDiv.classList.add('repo-info')

  }
  catch (error) {
    console.log(`Error: ${error}`)
  }
}

languageMenu.addEventListener('click', (e) => {
  const selectedLang = e.target.value
  if (languages.includes(selectedLang)) {
    contentDisplayBoxTitle.classList.add('hidden')
    contentDisplayBox.innerHTML = ''
    getRandomRepoByLang(e.target.value)
  }
})


// res.data.items[Math.floor(Math.random() * 16)]