import moment from "moment";

const globalVariables = {

    auth: {
        get user() {
            return localStorage.getItem('authedUser')
                ? JSON.parse(localStorage.getItem('authedUser'))
                : null
        }
    },

    api: {
        BaseUrl: 'http://localhost:8000',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    },
    methods: {
        handleDate: d => {
            const date = moment(d)
            const diff = date.diff(moment(), 'days')
            if (diff === 0) {
                return date.format('[Today] - h:mm A')
            }
            else if (diff === -1) {
                return date.format('[Yesterday] - h:mm A')
            }
            else {
                return date.format('MMMM Do YYYY - h:mm A')
            }
        },
        _spacing: s => s ? s.split('_').map(ss => ss[0].toUpperCase() + ss.slice(1).toLowerCase()).join(' ') : '',
        _spacing2: s => s ? s.split('.').map(s1 => s1)[1].split('_').map(ss => ss[0].toUpperCase() + ss.slice(1).toLowerCase()).join(' ') : '',
        capitalize: s => (s && s[0].toUpperCase() + s.slice(1).toLowerCase()) || '',
    }

}

export default globalVariables