/*
Delphinium.js

Delphinium is Strelitzia module responsible for orchestrating processes provided by Argentea

⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠉⠛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠀⠀⠀⠀⢀⡀⠄⣶⣶⠠⢀⡀⠀⠀⠀⠀⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠁⠀⠀⠀⢀⡠⠔⠊⠁⠀⢀⣿⣿⡀⠀⠈⠑⠢⢄⡀⠀⠀⠀⠈⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀⠀⢀⣤⣶⣷⡀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⢀⣾⣶⣤⡀⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠉⠀⠀⠀⢀⠔⠊⠀⢹⣿⣿⣿⣄⠀⠀⠀⢸⣿⣿⡇⠀⠀⠀⣠⣿⣿⣿⠏⠀⠑⠠⡀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⢀⠠⠊⠀⠀⠀⠀⠀⠹⣿⣿⣿⣦⣠⣴⣾⣿⣿⣷⣦⣄⣴⣿⣿⣿⠏⠀⠀⠀⠀⠀⠑⠄⡀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠐⠁⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠈⠂⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⠿⠛⠉⠁⠈⠉⠛⠿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠠⡄⠒⠒⠠⠄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⡀⠔⠈⠀⠀⡇⠀⠀⠀⠀⠀⠁⠢⢀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠃⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣸⠀⠀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⢠⣿⣿⣿⣿⣿⣿⣿⣿⣦⣠⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣆⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⢰⣿⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⡄⠀⣀⠀⠀⣀⣤⣾⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⡆⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⣿⣿⣿⣿⡟⠀⢹⣿⣿⣿⣿⣿⣷⣄⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⢻⣿⣿⣿⣿⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⢸⣿⣿⣿⡟⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⢻⣿⣿⣿⡇⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⣿⣿⣿⡟⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⡿⠁⠘⢿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⢻⣿⣿⣿⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠈⠻⠿⠃⠀⠀⠀⢀⣿⣿⣿⣿⣿⡿⠋⠀⠔⠢⠀⠙⢿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠘⠿⠟⠉⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⡟⠁⠀⠀⢂⡐⠀⠀⠈⢻⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⢠⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣯⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⣽⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⡄⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠹⣿⣿⣿⣧⠀⠀⠘⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣆⠈⠁⠀⠀⠀⠀⠈⠁⣰⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠃⠀⠀⣼⣿⣿⣿⠏⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⢹⣿⣿⣿⡄⠀⠀⠀⠀⠀⣀⣴⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⢠⣿⣿⣿⡏⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⢻⣿⣿⣷⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⣾⣿⣿⡟⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣇⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⢸⡇⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⣸⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⢀⢄⠀⠀⠹⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⢸⡇⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠏⠀⠀⡠⡀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠆⠈⢆⠀⠀⠀⠀⠉⠙⢻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠋⠉⠀⠀⠀⠀⡰⠁⠰⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠈⠀⠀⠀⠂⡀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⢀⠐⠀⠀⠀⠁⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠈⡀⠀⠀⠀⠈⠐⠠⠄⡀⠀⠸⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⠇⠀⢀⠠⠄⠂⠁⠀⠀⠀⢠⠁⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠐⡀⠀⠀⢰⠀⠀⠀⠀⠉⠀⣿⣿⣿⣿⣿⡿⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⢿⣿⣿⣿⣿⣿⠀⠉⠀⠀⠀⠀⡆⠀⠀⢀⠂⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⠁⠀⢁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡈⠀⠘⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⡇⠀⠀⠀⠐⢀⠀⠀⠀⠀⠀⠀⡀⠒⠀⠀⠀⢸⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠇⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣦⣄⡀⠀⠀⠀⢂⠀⠀⠀⠀⡐⠀⠀⠀⢀⣠⣴⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣷⠢⠤⢌⣆⣀⣀⣰⡠⠤⠔⣾⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡄⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⠃⠀⢀⠂⢸⣿⣿⡇⠐⡀⠀⠘⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠇⠀⠀⠄⠀⣿⣿⣿⣷⠀⠠⠀⠀⠸⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡟⠀⠀⠐⠀⠀⣿⣿⣿⣿⠀⠀⠂⠀⠀⢻⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇⠀⠀⠡⠀⠀⣿⣿⣿⣿⠀⠀⠄⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⢸⢻⣿⣷⠀⠀⠀⠀⠈⣿⣿⣿⣿⠁⠀⠀⠠⠊⣾⣿⡟⡇⠀⠀⠀⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠀⢸⢠⣿⣿⡄⠀⠀⠀⠀⣿⣿⣿⣿⠀⢀⠄⢀⢤⣿⣿⡄⡇⠀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣧⠀⠀⠀⠀⣿⣿⣿⣿⠀⠁⡠⠀⣼⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⣿⣿⣿⣿⠀⠈⠀⢠⣿⣿⣿⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⣿⣿⣿⣿⠀⠀⠀⣾⣿⣿⣣⡏⢛⡟⠛⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⣿⣿⣿⣿⠀⠀⣰⣿⣿⢯⢿⡷⣿⣿⢘⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⣿⣿⣿⣿⠀⢠⣿⣿⣯⣿⣿⣾⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⣿⣿⣿⣿⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿

https://www.deviantart.com/argonaut11/art/Delphinium-Darling-In-the-Franxx-756840835
*/

const argentea = require("./argentea.js");
const DEFAULT_FAMILY_NAME = "Subscriptions";
const DEBUG_FAMILY_BYPASS = false;

module.exports = {
	requestServiceKey: async()=>{
		return await argentea.requestServiceKey();
	},
	checkSession: async()=>{
		return await argentea.checkSession();
	},
	listTeams: async ()=>{
		return await argentea.listTeams();
	},
	login: async (login, password)=>{
		return await argentea.login(login, password);
	},
	sendCode: async (code)=>{
		return await argentea.sendCode(code);
	},
	listApps: async ()=>{
		return await argentea.listApps();
	},
	/* [RS Matrix, C Matrix, Country Codes] */
	downloadMatrices: async (appId)=>{
		let promises = [
			argentea.downloadRSMatrix(appId),
			argentea.downloadCMatrix(appId),
			argentea.downloadCountryCodes(appId)
		];
		return await Promise.all(promises);
	},
	downloadIAPs: async (appId)=>{
		let iaps = await argentea.listIAPs(appId);
		if (!iaps) return null;

		let dontMakeNoPromises = [];
		let yourBodyCantKeep = [];

		for (let iap of iaps){
			dontMakeNoPromises.push(argentea.downloadIAP(appId, iap.adamId));
		}
		yourBodyCantKeep = await Promise.all(dontMakeNoPromises);
		for (let raw of yourBodyCantKeep){
			parseIAP(raw);
		}

		return null;
	},
	createIAPs: async (orders, appId, storage, sequentialMode)=>{
		argentea.planning.resetProgressList();

		let firstRSOrder = getFirstRSOrder(orders);
		let firstRSOrderCreated = false;
		let selectedFamily;
		if (firstRSOrder){
			argentea.planning.planFamilyCheck();
			selectedFamily = await argentea.operations.selectFamily(appId, false, DEFAULT_FAMILY_NAME);
			if (!selectedFamily)
				return false;
			
			if (DEBUG_FAMILY_BYPASS){ 
				selectedFamily = {
					name: DEFAULT_FAMILY_NAME + Math.floor(Math.random(10000)),
					id: null
				};
			}
			
			if (!selectedFamily.id){
				//Create family by completing first RS order 
				argentea.planning.planFamilyCreation();
				let template = await argentea.operations.requestFamilyTemplate(firstRSOrder.bundle, appId);

				template.activeAddOns[0].productId = {value: firstRSOrder.bundle};
				template.activeAddOns[0].referenceName = {value: firstRSOrder.refname};
				//template.activeAddOns[0].pricingDurationType = {value: firstRSOrder.duration}; //doesn't work
				template.name = {value: selectedFamily.name};
				template.details.value = [];

				if (! await argentea.operations.createFamily(firstRSOrder.bundle, tempalte, appId))
					return false;
				firstRSOrderCreated = true;
				
				selectedFamily = await argentea.operations.selectFamily(appId, true, selectedFamily.name);
				if (!(selectedFamily && selectedFamily.id))
					return false;

				let productId = await argentea.operations.obtainProductId(firstRSOrder.bundle, appId);
				if (!productId)
					return false;

				let productDetails = await argentea.operations.requestIAPDetails(firstRSOrder.bundle, appId, productId);
				if (!productDetails)
					return false;
				productDetails.versions[0].details.value = [buildEnUsVersion(firstRSOrder.version.name, firstRSOrder.version.desc)];
				productDetails.pricingDurationType = {value: order.duration};
				if (! await argentea.operations.updateIAPDetails(firstRSOrder.bundle, productDetails, appId, productId))
					return false;

				if (! await sendPriceAndTrial(firstRSOrder, appId, productId, storage.rsMatrix, storage.cMatrix, storage.countryCodes))
					return false;
			}
		}
		//Create the rest of IAPs
		for (order of orders){
			if (firstRSOrderCreated && order == firstRSOrder) continue;
			argentea.planning.planIAPCreation(order);
		}
		let promises = [];
		for (order of orders){
			if (firstRSOrderCreated && order == firstRSOrder) continue;
			
			promises.push(new Promise(async (resolve, reject)=>{
				let tempalte = await argentea.operations.requestIAPTemplate(order.bundle, appId);
				if (!template){
					reject();
					return false;
				}

				template.familyId = selectedFamily.id;
				template.productId = {value: order.bundle};
				template.referenceName = {value: order.refname};
				template.clearedForSale = {value: true};
				template.pricingIntervals = [{value:{
					country: "WW",
					tierStem: determineTier(order.type, order.price, storage.rsMatrix, storage.cMatrix),
					priceTierEndDate: null,
					priceTierEffectiveDate: null
				}}]
				template.versions[0].details.value = [buildEnUsVersion(order.version.name, order.version.desc)];
				
				if (order.type == "rs"){
					template.pricingDurationType = {value: order.duration};
				}

				if (! await argentea.operations.createIAP(order.bundle, template, appId)){
					reject();
					return false;
				}

				if (order.type == "rs"){
					let productId = await argentea.operations.obtainProductId(order.bundle, appId);
					if (!productId){
						reject();
						return false;
					}

					if (! await sendPriceAndTrial(order, appId, productId, storage.rsMatrix, storage.cMatrix, storage.countryCodes)){
						reject();
						return false;
					}
				}

				resolve();
				return true;
			}));
		}
		if (sequentialMode){
			for (let promise of promises){
				await promise;
			}
		} else {
			await Promise.all(promises);
		}
		return true;
	}
}

function getFirstRSOrder(orders){
	for (let order of rders)
		if (order.type == "rs") 
			return order;
	return null;
}

function determineTier(type, price, rsMatrix, cMatrix){
	for (let t of (type == "rs") ? rsMatrix : cMatrix){
		if (price == t.price){
			return t.tier;
		}
	}
	return 0;
}

async function sendPriceAndTrial(order, appId, productId, rsMatrix, cMatrix, countryCodes){
	let equalizedTierMap = await argentea.operations.equalizeByUSD(order.bundle, appId, productId, determineTier("rs", order.price, rsMatrix, cMatrix));

	if (! await argentea.operations.createRSPricing(order.bundle, equalizedTierMap, countryCodes, appId, productId))
		return false;
	
	if (order.trial != "off"){
		if (! await argentea.operations.createTrial(order.bundle, order.trial, appId, productId))
			return false;
	}
	return true;
}

function buildEnUsVersion(name, description){
	return {value: {
		description: {value: description},
		name:        {value: name},
		localeCode:  "en-US"
	}};
}

function parseIAP(raw, rsMatrix, cMatrix){
	const REVERSE_TYPE_MAP = {
		"recurring": "rs",
		"consumable" : "c",
		"nonConsumable": "nc"
	};
	
	function findRSPrice(from, country){
		if (!from) return null;
		let tier = null;

		for (let price of from){
			if (price.value.country == country){
				tier = price.value.tierStem;
				break;
			}
		}

		if (tier){
			for (let rsPrice of rsMatrix)
				if (rsPrice.tier == tier)
					return rsPrice.price;
		}

		return null;
	}
	function findCPrice(tier){
		if (!tier) return null;

		for (let cPrice of cMatrix){
			if (cPrice.tier == tier){
				return cPrice.price;
			}
		}

		return null;
	}
	function findTrial(from, country){
		if (!from) return null;
		let tier = null;

		for (let offer of from){
			if (offer.value.country == country){
				return offer.value.durationType;
			}
		}

		return null;
	}

	let result = {
		adamId: raw.adamId,
		type: REVERSE_TYPE_MAP[raw.addOnType],
		refname: raw.referenceName.value,
		bundle: raw.productId.value,
		version: {
			name: null, //raw.versions[0].details.value[0].value.name.value,
			desc: null //raw.versions[0].details.value[0].value.description.value
		}
		// duration: raw.pricingDurationType.value,
		// trial: null,
		// price: null
	};
	if (raw.versions.length > 0 && raw.versions[0].details.value.length > 0){
		result.version.name = raw.versions[0].details.value[0].value.name.value;
		result.version.desc = raw.versions[0].details.value[0].value.description.value;
	}
	switch (result.type){
		case ("rs"): {
			result.duration = pricingDurationType.value;
			result.trial = findTrial(raw.appliedPricingData.introOffers, "US");
			result.price = findRSPrice(raw.appliedPricingData.subscriptions, "US");
			break;
		}
		case ("c"):
		case ("nc"):{
			result.price = findCPrice(raw.pricingIntervals[0].value.tierStem) || "off";
			break;
		}
		default:
			return null;
	}
	return result;
}