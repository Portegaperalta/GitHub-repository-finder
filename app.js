const body = document.querySelector('body')
const darkModeBtn = document.querySelector('#toggleDarkModeBtn')

const languageMenu = document.querySelector('#languageSelect')
const contentDisplayBox = document.querySelector('#contentDisplayBox')
const contentDisplayBoxTitle = document.querySelector('#contentDisplayBox h2')

const refreshBtn = document.querySelector('#refreshBtn')
const retryBtn = document.querySelector('#retryBtn')

// Search repositories api

const getRandomRepoByLang = async (lang) => {
  try {

    //fetch random repo from github

    const config = { headers: { Accept: 'application/vnd.github+json' } }
    const res = await axios.get(`https://api.github.com/search/repositories?q=${lang}`, config)
    const filteredRepos = res.data.items.filter(repo => repo.language === lang)
    const randomRepo = filteredRepos[Math.floor(Math.random() * 16)]
    console.log(randomRepo)

    //creating elements to add to dom

    const newRepoTitle = document.createElement('h3')
    const newRepoDescription = document.createElement('p')
    const newRepoLang = document.createElement('p')
    const newRepoStars = document.createElement('p')
    const newRepoForks = document.createElement('p')
    const newRepoWatchers = document.createElement('p')

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
    contentDisplayBox.append(newRepoLang)
    contentDisplayBox.append(newRepoStars)
    contentDisplayBox.append(newRepoForks)
    contentDisplayBox.append(newRepoWatchers)
  }
  catch (error) {
    console.log(`Error: ${error}`)
  }
}

languageMenu.addEventListener('click', (e) => {
  contentDisplayBoxTitle.classList.add('hidden')
})


// res.data.items[Math.floor(Math.random() * 16)]