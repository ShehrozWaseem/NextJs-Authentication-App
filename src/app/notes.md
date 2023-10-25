# React vs Next
- in react the code was run on the client side means we have to add extra js to add interactivity to the app or to by hydrated in the browser
- in next js we have sv component so the component are rendered on sv so we dont need extra js which makes the bundle size less and improves performance
- but still we have to use some client components for app but for the comp where we dont need any interactivity we'd just use sv compone
- like fetching data, use sensistive info, large dependenices wale component
- the app directory structure we perform sv side or client cide 
- suspense boundaries : srf uss component ma loading show krenge jhan time lag rha baki page load hua va huga
- in next js 13 we have app router and before 13 we had pages router

# HOW IT WORKS
- How it improves performance through diff rendering techniques
- Client Side rendering the content is rendered in the browser where we get html and js and the html is rendered using the js in bundle we get from the server
- this is bad for seo and bigger load times in the browser as lots of js is running 
- in SSR the html is first processed on the server and a small js file is sent to the browser which hydrates the html page (adding interactivity)
- this is good for seo and imprve performance due to reduce bundle size
- pre rendering the content on server and then they are cached once rendered to making it fast
- CSR - rendered on the server and hydrated in the browser 
- SSR - rendered on the server and no hydration needed 
- we can also fetch the db content on the server and add it in html before being rendered
- but as the components are not hydrated so you need client components for such components and both components can be cached in to improve load time
- for more info where to use what see doc

# LAYOUT
- wraps all the pages in the app
- to improve code reusability we use layout like a navbar and footer in every page so we just place them in the layout file
- the global css is iimported so means its for every page
- fonts and metadata - since meta data is defined on layout so by default it will be for every page

# LINK
- provide the funct for intercepting the req to server and handle the routing on fe
- when next js see a link components it fetches the page in bg which is linked to the component

# FONTS
- next provide us google font to import directly
- we can entery weight and styles for fonts
- fonts are self hosted so we wont need to make any reques

# HOW TOKEN WORKS
- from api we generate a token then the token is sent to the browser/email and also stored in the db
- now in the verification part the api takes the token from browser/email and find the token in the db (in db it filter the user email which obv will be coming from api as a param and then with that email the associated token will be verified)

# LOGIN
- once the user is logged in the email and password are matched from db
- we create a token and set it in user cookies (NOT IN LOCAL STORAGE)
- we'll send the secure cookie to user and will verify it there 