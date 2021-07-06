/*
Chlorophytum.js

Chlorophytum is Strelitzia module responsible for networking, providing set of reliable functions to send HTTP requests to AppStore Connect, as well as managing session

⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⢠⡀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⡠⠊⠙⢷⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣶⣶⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⡠⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠙⢿⣿⣿⣿⣿⣿⡿⠋⠁⠀⠀⢀⠔⠀⠀⠢⡀⠀⠀⠈⠛⣿⣿⣿⣿⣿⣿⡿⠋⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠙⠻⣿⣿⠏⠀⠀⠀⠀⢠⡝⡠⠊⠑⢄⠈⡄⠀⠀⠀⠈⠻⣿⣿⠟⠋⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠈⠣⡀⠀⠀⠀⠀⠈⠪⡀⠀⠀⣀⠕⠁⠀⠀⠀⠀⠀⠜⠁⠀⠀⠔⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠒⢀⠈⠀⠂⠁⠀⠒⠀⠀⠠⠂⠀⠀⠀⠀⢰⣸⢷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡏⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣀⡇⠀⠀⠀⠀⠀⠐⡐⠀⢀⠄⡑⠀⠀⢊⠤⡀⠀⢂⠁⠀⠀⠀⠀⠀⢸⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢹⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠠⠀⢠⠁⠀⠈⠪⠕⠁⠀⠘⡄⠈⡄⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢸⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠁⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⡀⢀⠂⠀⠆⠀⠀⠀⠀⠀⠀⠀⠀⣴⠀⠰⠀⢀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠘⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡎⠀⠸⠢⠀⠀⠀⠀⠀⠀⢀⠔⠇⡆⠀⢳⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠻⣿⣿⣿⠁⠀⣿⣷⣤⣁⠂⠀⡀⠐⣈⣴⣾⣷⠀⠈⣿⣿⣿⠟⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢡⠀⠈⣻⠇⠀⢸⣿⣿⣿⣿⣷⣶⣶⣿⣿⣿⣿⣿⡇⠀⠸⣟⠁⠀⡎⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⢗⠴⠿⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠿⠦⡺⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠈⣦⠀⠀⢸⣿⣿⣿⣿⣿⡟⠁⠈⢿⣿⣿⣿⣿⣿⡇⠀⠀⣴⠁⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠀⠀⠀⢰⣿⣷⣄⣿⣿⣿⣿⡿⠋⠀⡠⠄⠀⠙⢿⣿⣿⣿⣿⣠⣾⣿⡆⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⢘⣿⣿⣿⣿⣿⣿⣿⡏⠁⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⡇⠾⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠈⢻⣿⣿⣿⣿⣿⣿⣿⡃⠀⠀⠀⢠⣿⠏⢸⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠆⢹⣿⣿⣿⣿⣿⣿⡇⠀⠀⢀⠀⠀⢸⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠐⠃⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⡏⠡⠀⠀⢠⣿⡟⠀⢸⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⡌⠀⢀⢿⣿⣿⣿⣿⣿⡇⠀⡌⠀⠈⠄⢸⣿⣿⣿⣿⣿⣿⣧⠀⠛⠠⠂⠀⠀⠰⠖⠛⢀⣾⣿⣿⣿⣿⣿⣿⡇⠠⠁⠀⢁⠀⢸⣿⣿⣿⣿⣿⡿⡀⠀⢃⢀⣿⠏⠀⠀⢸⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠰⠀⢠⠁⠈⢿⣿⣿⣿⣿⣇⣀⠠⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⢀⡀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠄⣀⣸⣿⣿⣿⣿⡿⠀⠐⡀⠈⣿⠏⠀⠀⢀⣺⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠇⢀⠂⠀⠀⠘⣿⣿⣿⣿⣿⣷⣕⠁⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⡷⠀⠀⢸⡇⠀⠀⢾⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⢈⣾⣿⣿⣿⣿⣿⣿⠁⠀⠀⠡⠀⢰⠀⠀⣠⠏⢸⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⢰⠀⡌⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣷⣄⠀⡇⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⢸⡇⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⢸⡴⣳⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⢃⠀⡆⣴⠋⠀⢸⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⡆⠰⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣷⣄⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠘⡇⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣠⣾⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠈⡄⢩⠁⠀⠀⢸⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠃⠃⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⡿⠻⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⠟⢿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⢠⠸⠀⠀⣠⣸⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣦⡀⢸⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⡿⠁⠀⠙⢿⣿⣿⣿⣿⣿⢣⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠞⣿⣿⣿⣿⣿⡿⠃⠀⠈⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⡄⣦⣚⣽⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣼⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠃⠀⠀⠀⠀⠹⣿⣿⣿⠃⠀⠂⠄⠀⠀⠀⢀⡇⠀⠀⢀⠠⠐⠀⠘⣿⣿⣿⠋⠀⠀⡀⠀⠘⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⣿⣿⣇⡀⠀⠀⠀⠡⠀⠀⠀⠀⠀⠀⠆⠀⠀⠀⢀⣸⣿⣿⠀⠀⡆⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣷⣦⢤⣀⢡⠀⠀⠀⠀⠌⣀⠤⣴⣾⣿⣿⣿⣿⠀⠀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⠋⠀⠀⠉⢹⣶⣶⡏⠉⠀⠀⠙⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⡿⠁⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⠈⢿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⡧⠀⡀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⢀⠀⢼⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⡇⠀⠘⢀⠂⠀⢸⣿⣿⡇⠀⠡⢀⠁⠀⢸⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡤⠤⠤⠄⠀⡀⢸⣿⣿⣿⡇⠀⠀⠁⠀⠀⢸⣿⣿⡇⠀⠀⠁⠀⠀⢸⣿⣿⣿⠇⢀⣀⢠⡤⣤⣤⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⠀⢸⣿⣿⣿⡃⣿⣿⣿⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠟⡿⣿⣿⣇⠀⠀⠒⠂⠀⣼⣿⣿⡇⠀⠐⠒⠀⠀⣸⣿⣿⢿⢰⣿⢿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡸⡇⣴⣿⣿⡄⠀⠀⢸⠀⣿⣿⣿⣇⠀⡇⠀⠀⢠⣿⣿⣆⢸⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠈⠀⣿⣿⣿⣿⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⡄⠀⡆⣿⣿⣿⣿⠸⠀⢸⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠃⠀⠀⣿⣿⣿⣿⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⣿⣿⣿⣿⠀⠀⣸⣿⣿⣿⣿⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⣿⣿⣿⣿⠀⢀⣿⣿⣿⣿⣧⡏⢛⡟⠛⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⣿⣿⣿⣿⠀⣼⣿⣿⣿⢯⢿⡷⣿⣿⢘⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⣿⣿⣿⣿⢰⣿⣿⣿⣯⣿⣿⣾⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣹⣿⣿⣏⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿

https://www.deviantart.com/argonaut11/art/Chlorophytum-Darling-In-The-Franxx-Wallpaper-744586496
*/


const https = require('https'); //For apol
const zlib = require("zlib");   //For reading apol POST responses (really)
const BAD_APOL = "🏳️‍🌈🏳️‍🌈🏳️‍🌈  B4D AP0L 🏳️‍🌈🏳️‍🌈🏳️‍🌈";

let storage = null;
let saveStorage;
const JSON_EXPECTED = true;

module.exports = {
	BAD_APOL: BAD_APOL,

	setStorage: (s, saveCallback)=>{
		storage = s;
		saveStorage = saveCallback;
	},

	sendServiceKeyRequest: ()=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.serviceKey, null, JSON_EXPECTED);
	},

	sendToOlympus: ()=>{
		return genericRequest("GET", null, ENDPOINTS.olympus, null);
	},

	sendLogin: (login, password)=>{
		const data = JSON.stringify({
			accountName: login,
			password: password,
			rememberMe: true
		});
		return genericRequest("POST", data, ENDPOINTS.login, null);
	},

	sendCode: (code)=>{
		const data = JSON.stringify({ 
			securityCode: { 
				code: code 
			} 
		});
		return genericRequest(METHOD_POST, data, ENDPOINTS.code, null);
	},

	sendUserDetails: ()=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.userdetails, null, JSON_EXPECTED);
	},

	sendAppsRequest: ()=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.listApps, null, JSON_EXPECTED);
	},

	sendIAPsRequest: (appId)=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.listIAPs, [appId], JSON_EXPECTED);
	},

	sendFamiliesRequest: (appId)=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.listFamilies, [appId], JSON_EXPECTED);
	},

	sendRSMatrixRequest: (appId)=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.priceMatrixRecurring, [appId], JSON_EXPECTED);
	},

	sendCMatrixRequest: (appId)=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.priceMatrixConsumable, [appId], JSON_EXPECTED);
	},

	sendEqualizeByUSDRequest: (appId, productId, tier)=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.equalize, [appId, productId, tier], JSON_EXPECTED);
	},

	sendCountriesRequest: ()=>{
		//return genericRequest(METHOD_GET, null, ENDPOINTS.countryCodes, null);
		return genericRequest(METHOD_GET, null, ENDPOINTS.countryCodesBetter, null, JSON_EXPECTED);
	},

	sendCountriesRequestLegacy: ()=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.countryCodes, null, JSON_EXPECTED);
	},

	sendTemplateRequest: (appId, iapType)=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.iapTemplate, [appId, iapType], JSON_EXPECTED);
	},

	sendFamilyTemplateRequest: (appId)=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.famTemplate, [appId], JSON_EXPECTED);
	},

	sendIAPCreation: (filledTemplate, appId)=>{
		return genericRequest(METHOD_POST, JSON.stringify(filledTemplate), ENDPOINTS.create, [appId]);
	},

	sendFamilyCreation: (filledTemplate, appId)=>{
		return genericRequest(METHOD_POST, JSON.stringify(filledTemplate), ENDPOINTS.createFamily, [appId]);
	},

	sendIAPDetailsRequest: (appId, productId)=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.iapDetails, [appId, productId], JSON_EXPECTED);
	},

	sendIAPDetailsRefresh: (updated, appId, productId)=>{
		return genericRequest(METHOD_PUT, JSON.stringify(updated), ENDPOINTS.iapDetails, [appId, productId]);
	},

	sendRSPriceCreation: (pricing, appId, productId)=>{
		return genericRequest(METHOD_POST, JSON.stringify(pricing), ENDPOINTS.rsPriceCreate, [appId, productId]);
	},

	sendRSPricingRequest: (appId, productId)=>{
		return genericRequest(METHOD_GET, null, ENDPOINTS.pricingDownload, [appId, productId], JSON_EXPECTED);
	},

	sendTrialCreation: (trial)=>{
		return genericRequest(METHOD_POST, JSON.stringify(trial), ENDPOINTS.trialCreate, null);
	},

	sendTrialCreation: (trial)=>{
		return genericRequest(METHOD_POST, JSON.stringify(trial), ENDPOINTS.trialCreate, null);
	}
};

const ENDPOINTS = {
	serviceKey:            "https://appstoreconnect.apple.com/olympus/v1/app/config?hostname=itunesconnect.apple.com",
	olympus:               "https://appstoreconnect.apple.com/olympus/v1/session",
	login:                 "https://idmsa.apple.com/appleauth/auth/signin",
	code:                  "https://idmsa.apple.com/appleauth/auth/verify/trusteddevice/securitycode",
	preferredCurrencies:   "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/users/itc/preferredCurrencies",
	userdetails:           "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/user/detail",
	listApps:              "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/manageyourapps/summary/v2",
	listIAPs:              "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps",                                   //appId
	listFamilies:          "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/families",                          //appId
	iapDetails:            "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/#",                                 //appId, productId
	iapTemplate:           "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/#/template",                        //appId, type
	famTemplate:           "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/family/template",                   //appId
	priceMatrixRecurring:  "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/pricing/matrix/recurring",          //appId
	priceMatrixConsumable: "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/pricing/matrix?iapType=consumable", //appId
	equalize:              "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/#/pricing/equalize/USD/#",          //appId, productId, tier
	create:                "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps",                                   //appId
	createFamily:          "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/family/",                           //appId
	rsPriceCreate:         "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/#/pricing/subscriptions",           //appId, productId
	pricingDownload:       "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/#/iaps/#/pricing",                         //appId, productId
	trialCreate:           "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/iaps/pricing/batch",
	countryCodes:          "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/users/itc/preferredCurrencies",
	countryCodesBetter:    "https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/apps/pricing/supportedCountries"
}

const METHOD_GET = "GET";
const METHOD_POST = "POST";
const METHOD_PUT = "PUT";

function formCookieHeader(){
	if (storage.cookies){
		let f = storage.cookies.join("; ");
		return f;
	} else
		return null;
}

function getCookieKey(c){
	return c.split("=")[0];
}
function addCookiesToStorage(cookies){
	if (!storage.cookies)
		storage.cookies = [];
	for (let c in cookies){
		let overwrite = false;
		for (let ec in storage.cookies){
			let oldKey = getCookieKey(storage.cookies[ec]);
			let newKey = getCookieKey(cookies[c]);
			if (oldKey == newKey){
				overwrite = true;
				storage.cookies[ec] = cookies[c];
				break;
			}
		}
		if (!overwrite)
			storage.cookies.push(cookies[c]);
	}
	saveStorage();
}

function formHeader(dataLength){
	let headers = {
		"Content-Type": 'application/json',
		"Content-Type": 'application/json',
		"Content-Length": dataLength,
		"X-Requested-With": 'XMLHttpRequest',
		"Accept": "application/json, text/javascript"
	}
	if (storage["sessionId"]) headers["X-Apple-Id-Session-Id"] = storage["sessionId"];
	if (storage["serviceKey"])   headers["X-Apple-Widget-Key"] = storage["serviceKey"];
	if (storage["scnt"])                       headers["scnt"] = storage["scnt"];
	
	let storedCookies = formCookieHeader();
	if (storedCookies)                       headers["Cookie"] = storedCookies;

	return headers;
}

function applyParametersToEndpoint(endpoint, parameters){
	let e = endpoint;
	//Object.assign(e, endpoint);
	for (let p of parameters){
		e = e.replace("#", p);
	}
	return e;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const RETRY_DELAY_MS_MIN = 300;
const RETRY_DELAY_MS_SPREAD = 420;
const RETRIES = 3;
async function genericRequest(method, data, endpoint, endpointParameters, jsonExpected = false, tries = RETRIES){
	while (tries){
		await sleep(RETRY_DELAY_MS_MIN + RETRY_DELAY_MS_SPREAD * Math.random())
		--tries;
		try {
			let response = await unsafeGenericRequest(method, data, endpoint, endpointParameters, RETRIES - tries + 1, jsonExpected);
			if (response)
				return response;
		} catch(e){}
	}
	return null;
}

let requestErrors = [];
function unsafeGenericRequest(method, data, endpoint, endpointParameters, retryIndex, jsonExpected){
	function checkForErrors(body){
		try {
			let r = JSON.parse(body);
			if (r.data){
				if (r.data.sectionErrorKeys){
					requestErrors[retryIndex] = r.data.sectionErrorKeys;
				}
			}
		} catch (e){
			requestErrors[retryIndex] = "Failed to check for errors: " + body;
		}
	}
	return new Promise(resolve => {
		const options = {
			method: method,
			headers: formHeader((method == "GET") ? 0 : data.length)
		}
		
		let requestTarget;
		if (endpointParameters)
			requestTarget = applyParametersToEndpoint(endpoint, endpointParameters);
		else
			requestTarget = endpoint;
		const req = https.request(requestTarget, options, res => {
			addCookiesToStorage(res.headers["set-cookie"]);
			if (endpoint == ENDPOINTS.login || endpoint == ENDPOINTS.olympus){
				storage["scnt"] = res.headers["scnt"];
				storage["sessionId"] = res.headers["x-apple-id-session-id"];
				saveStorage();
			}

			let data = [];
			res.on('data', chunk => {
				data.push(chunk);
			});
			res.on('end', async () => {
				requestErrors = [];

				let responseBody = Buffer.concat(data).toString();
				if (res.headers["content-encoding"] == "gzip"){
					if (method != "POST")
						console.log("WARNING: got gzipped response to " + method + " request.\nEndpoint: " + requestTarget);
					responseBody = zlib.gunzipSync(Buffer.concat(data)).toString();
				}

				switch (res.statusCode){
				case (200):
				case (201):
				case (204):
					checkForErrors(responseBody);
					if (method == "GET"){
						if (jsonExpected){
							try {
								resolve(JSON.parse(responseBody));
							} catch(e){
								resolve(null)
							}
						} else 
							resolve(responseBody);
					} else
						resolve("OK");
					break;
				case (401):
					resolve("AUTH");
					break;
				case (409):
					resolve("CODE");
					break;
				case (412):
					checkForErrors(responseBody);
					if (endpoint == ENDPOINTS.login || endpoint == ENDPOINTS.olympus)
						resolve("Need to acknowledge to Apple's bullshit agreements");
					else
						resolve(responseBody)
					break;
				case (422):
					checkForErrors(responseBody);
					resolve("MALFORMED REQUEST");
					break;
				case (500):
				case (502):
				case (503):
				case (504):
					let message = `Request failed: ${res.statusCode} at ${endpoint}`;
					console.log(message);
					//console.log(responseBody);
					requestErrors[retryIndex] = [BAD_APOL]
					resolve(null);
					break;
				default:
					console.log(`Unknown status: ${res.statusCode} at ${endpoint}`);
					resolve(responseBody);
					break;
				}
			});
		});

		req.on('error', error => {
			console.error(error);
		})

		if (data) req.write(data);
		req.end();
	});
}