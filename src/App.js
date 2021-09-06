import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import { Typography } from '@material-ui/core';

const alanKey= '79826ce58f467a8f29ef99acaa8cea612e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
  const classes= useStyles();
  const [newsArticles,setNewsArticle]= useState([]);
 const [activeArticles,setActiveArticles]= useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand:({command, articles,number}) =>{
        if(command === 'newHeadlines'){
          
         setNewsArticle(articles);
         setActiveArticles(-1);
        } else if(command === 'highlight'){
            setActiveArticles((p) => p + 1);   
        } else if(command === 'open'){
           const parsedNumber= number.length > 2 ? wordsToNumbers(number,{fuzzy: true}) : number;
           const article= articles[parsedNumber - 1];
          
         
          if(parsedNumber > 20){
            alanBtn().playText('Please try that again');
          }else {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening.....');
          }
          
        }
      }

    })
  }, [])

  //https://tender-mahavira-ce4b52.netlify.app/

  return (
     <div>
      <div className={classes.logoContainer}> 
      <img src="https://media-exp1.licdn.com/dms/image/C560BAQGN6aSFSg3mXQ/company-logo_200_200/0/1614676658593?e=2159024400&v=beta&t=RYkOBRgczMgnc7OPJ_yYgVmKZ3Z_x3X-TkvyJBI8hpg" className={classes.alanLogo} alt="alan logo"/>
      {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
 
      </div>
      <NewsCards articles={newsArticles} activeArticles={activeArticles} />
     </div>
  );
}

export default App;
