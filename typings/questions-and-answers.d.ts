interface Answer {
    id: number,
    body: string,
    date: string,
    answerer_name: string,
    helpfulness: number,
    photos: {id: number, url: string}[]
}

interface Question {
    question_id: number,
    question_body: string,
    question_date: string,
    asker_name: string,
    question_helpfulness: number,
    reported: boolean,
    answers: {[answer_id: number]: Answer}
}
