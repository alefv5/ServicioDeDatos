const scanner = require("sonarqube-scanner")
scanner({
    serverUrl: 'http://localhost:9000',
    token: '63fe8d9fd9b8fdd2bb593ece0191880a13f17383',
    options: {
        'sonar.projectName': 'Node express nahual',
        'sonar.projectDescription': 'Nahual servicio de datos',
        'sonar.sources': 'src',
        'sonar.login': '<LOGIN USERNAME>',
        'sonar.password': '<LOGIN PASSWORD>'

    }
}, () => process.exit())