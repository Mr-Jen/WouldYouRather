let users = {
    userId: {
      id: userId,
      name: userName,
      avatarURL: avatarUrl,
      answers: {
        questionId: option,
      },
      questions: [questionId]
    }
}

let questions = {
    questionId: {
        id: questionId,
        author: userId,
        timestamp: timestamp,
        optionOne: {
            votes: [userId],
            text: questionText,
        },
        optionTwo: {
            votes: [userId],
            text: questionText
        }
    }
}

authedUser = userId