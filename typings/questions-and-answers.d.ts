// `GET /qa/questions/:question_id/answers` returns an object whose `.results` property is an array
// of `Answer`s.
// i.e. it returns `{results: [question1, question2, ...], ...}`
interface Answer {
    id: number,
    body: string,
    date: string,
    answerer_name: string,
    helpfulness: number,
    photos: {id: number, url: string}[]
}

// `GET /qa/questions` returns an object whose `.results` property is an array of `Question`s.
// i.e. it returns `{results: [question1, question2, ...], ...}`
interface Question {
    question_id: number,
    question_body: string,
    question_date: string,
    asker_name: string,
    question_helpfulness: number,
    reported: boolean,
    answers: {[answer_id: number]: Answer}
}
