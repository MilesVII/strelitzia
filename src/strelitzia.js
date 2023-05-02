/*
Strelitzia.js

Strelitzia is main module responsible for wrapping platform-depending code and providing Delphinium's functionality to GUI

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠓⢲⠤⣄⣀⠀⠀⠀⠀⠀⠀⠀⡇⢸⠀⠀⠀⠀⠀⠀⠀⣀⣠⠤⠖⠓⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠈⡄⠀⠈⠙⠳⠤⡄⠀⠀⢀⡇⠸⡆⠀⠀⢠⡤⠖⠊⠁⠀⢀⠁⢰⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡀⢠⠀⠀⠀⠀⠀⡇⠀⠀⢸⠁⠀⣇⠀⠀⢸⠀⠀⠀⠀⠀⡌⢀⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢇⠀⡀⠀⠀⠀⠀⡇⠀⠀⣺⠀⠀⣧⠀⠀⢸⠀⠀⠀⠀⠀⠁⡸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢤⡑⠀⠀⠀⠀⢻⠀⠀⡏⠀⠀⢸⡀⠀⣾⠀⠀⠀⡠⢊⡤⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢢⠀⡀⠀⢸⠀⢘⡇⠀⠀⢸⡆⠀⡇⠀⢀⠂⡔⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡄⢠⠀⢸⠀⢸⠁⠀⠀⠀⣇⠀⡇⠀⡈⢠⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠤⠤⠤⢤⣠⣀⡀⠀⠀⠳⢄⡀⠸⡆⣼⠀⠀⠀⠀⣧⢀⡇⠀⡡⠞⠀⠀⢀⣄⣀⡤⠤⢤⠤⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⣦⣀⣀⣀⣀⠀⠈⠙⢦⡤⠀⠉⠢⡷⡇⠐⠄⠠⠂⢸⢸⡴⠋⠀⣀⠴⠛⣿⠀⣀⣀⣀⣀⣼⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⢿⡇⠀⠀⠀⠀⠀⠑⠄⠈⠳⣄⠀⢠⡇⠠⠀⠀⠄⢘⡆⠀⣤⠟⠁⡠⠊⠀⠀⠀⠀⠀⢸⠋⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠁⠀⠀⠀⠀⠀⠀⠀⠈⠢⠈⠳⣤⡳⡄⠀⠀⢤⠞⡥⠊⠁⠔⠁⠀⠀⠀⠀⠀⠀⠀⠘⠀⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡄⠸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⡌⣇⠨⢦⣰⠋⣺⣤⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⢸⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣇⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠇⢷⡀⠀⠀⢀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠄⡼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⣦⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠢⢈⠲⣼⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣦⡀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠑⠋⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⢀⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⢰⣿⠃⡎⠲⢄⠀⠀⠀⠀⠀⠀⡠⠔⠹⠘⣿⡆⠀⢀⡴⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⡀⢀⣀⣀⣀⣀⣀⣀⠀⢀⠀⢀⠀⠀⠀⠀⠁⠙⠦⡀⡿⢠⠀⠀⠀⠙⠢⡀⢀⠴⠊⠀⠀⠀⡆⢻⢃⡴⠋⠀⠀⠀⠀⢀⠀⠀⡀⠀⢀⣀⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠞⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠒⠒⠓⢆⡀⠀⠈⡇⠘⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠁⢸⠁⠀⢀⡰⠓⠓⠒⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⢳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣠⢟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢫⡀⢰⠃⢸⠦⣀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠴⣿⠈⡇⢀⡞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡻⣆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⠞⠁⠀⠑⢄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠄⠙⣼⠀⢸⠂⠈⠓⢤⡀⠀⠀⢀⡠⠞⠉⠈⡇⠀⣧⠊⠁⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⡠⠊⠀⠈⠣⡆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡸⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠁⠀⠀⠒⠒⠀⠀⠔⠁⠀⠀⢸⠀⢸⠃⠀⠀⠀⠙⠢⠔⠋⠀⠀⠀⢰⡇⠀⡇⠀⠀⠈⠢⠄⠀⠒⠒⠀⠀⠈⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢧⠀⠀⠀⠀
⠀⠀⠀⡘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠘⣇⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⢠⠇⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢫⠀⠀⠀
⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⢯⠀⠀⢀⣤⠎⠙⣄⠀⠀⠀⡼⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀
⠀⠀⠸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠄⠐⠒⢠⠀⠀⡸⣄⠀⠘⣇⣀⠟⠁⡠⢄⠈⠳⣤⣨⠃⠀⣀⣇⠀⠀⡄⠐⠂⠠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠄⠀⠀
⠀⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠁⠀⠀⠀⠈⠀⣰⠓⠀⠙⢦⣽⡋⠀⠰⡁⣠⡆⠀⠘⣮⠴⠋⠁⠉⢆⠀⠁⠀⠀⠀⠈⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡄⠀⠀
⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠡⡀⠀⠀⠀⠀⠀⣇⠀⠀⠀⢸⡀⢄⡀⠀⢫⡙⠀⢀⡠⠀⡗⠀⠀⠀⢸⠀⠀⠀⠀⠀⢀⠜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠇⠀⠀
⠀⠀⠀⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⣠⣺⠀⠀⠀⠈⢣⠀⠁⠃⠀⠀⠀⠉⠀⣜⠁⠀⠀⠀⡟⢄⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠀⠀⠀
⠀⠀⠈⡇⠈⠢⢄⢀⡦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠟⣦⡠⠊⠀⠸⡄⠀⠀⠀⠠⢇⠀⠀⠀⠀⠀⠀⡸⠁⠀⠀⠀⢀⡇⠀⢑⡄⡰⠛⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⡄⡀⢴⣿⣿⡅⠀⠀
⠀⠀⠀⢧⠀⠀⣼⡿⠈⠹⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣠⠇⠀⠈⠓⢄⠀⠐⡗⠀⠀⠀⠀⣸⠂⠀⢸⠇⠀⠀⣧⠀⠀⠀⠀⢼⠀⢠⣾⠏⠀⠀⠘⢄⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⣿⠀⢸⣿⣿⠀⠀⠀
⠀⠀⠀⣹⠀⢀⣿⡇⠀⠀⠈⠉⠉⠋⠉⠉⠉⠉⠉⠉⠉⠉⠀⠀⢀⠀⠀⠀⠘⢳⣄⢻⠀⠀⠀⣐⠇⠀⠀⠘⠀⠀⠀⠸⡄⠀⠀⠀⡞⣰⡟⠁⠀⠀⠀⡀⠀⠀⠈⠉⠉⠉⠉⠉⠉⠉⠙⠉⠉⠀⠀⠀⠘⡆⠈⣿⡷⠀⠀⠀
⠀⠀⠀⠈⡇⢸⣿⠂⣳⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠔⠛⠳⡄⠀⠀⠀⠉⠿⡀⠀⢀⡟⠀⠀⠀⠀⠀⠀⠀⠀⢱⡄⠀⠀⡟⠉⠀⠀⠀⣀⠔⠉⠣⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⠀⣳⠀⣷⠃⠀⠀⠀
⠀⠀⠀⠀⢳⣸⠇⠀⠘⡎⠷⢤⣀⣀⣀⣀⣀⣤⠤⠤⠶⠋⠀⠀⠀⠀⠈⢳⡀⠀⠀⠀⠁⠀⡼⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⢣⠀⠀⠀⠀⠀⢀⡴⠁⠀⠀⠀⠀⠙⠢⡤⣤⣤⣀⣀⣀⣀⣀⣠⣾⣿⠃⠀⠘⣶⡟⠀⠀⠀⠀
⠀⠀⠀⠀⠘⡿⠀⠀⠀⢹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡛⣇⠀⠀⠀⡸⠉⢀⠀⠀⠀⠀⠂⠀⠀⠀⡠⠉⢏⠀⠀⠀⣸⢋⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⡿⠁⠀⠀⠀⢰⣿⣿⡟⠀⠀⠀⢻⠇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠌⠀⢧⠀⠀⢸⠇⡀⠀⠡⠀⠀⠀⠀⠀⠀⠔⠀⢀⣸⡇⠀⠀⣸⠀⠑⡀⠀⠀⠀⣠⣾⣿⣿⣿⠃⠀⠀⠀⢀⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠂⠀⠀⢸⠀⠀⠻⣤⣄⡈⠐⢱⡀⠀⠀⠀⣬⣶⣿⣿⣿⠟⠀⠀⡇⠀⠀⠈⢄⢤⣾⣿⣿⣿⣿⠇⠀⠀⠀⠀⣼⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢷⠈⠐⠒⠀⠀⠀⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠘⡆⠀⠀⢨⠋⡇⠉⡇⢱⠖⢶⡎⢹⠉⢸⠘⡌⠀⠀⢀⠇⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠁⠀⠀⠒⠛⠁⣞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠃⠀⣠⠃⠀⡇⠀⡇⢸⠅⠘⡇⢸⠀⠘⠀⠘⣆⠀⠸⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡸⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠨⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠏⠀⢠⠃⠀⠀⠀⠀⠇⢸⠄⠰⡇⠀⠀⠀⠀⠀⠘⡄⠀⠺⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠀⠀⠸⡄⢀⠊⠀⠀⠡⣸⠀⠠⡇⠌⠀⠀⠑⡀⢠⠇⠀⠀⠱⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡁⠀⠀⠀⡧⠁⠀⠀⠀⠀⢹⠀⠀⡏⠀⠀⠀⠀⠈⢾⠀⠀⠀⢀⡗⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠎⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠓⢤⡀⠀⠀⠀⠀⠀⠀⢀⢧⠀⠀⠀⢻⠀⠀⠀⠀⠀⢸⠀⠀⡇⠀⠀⠀⠀⠀⡯⠀⠀⠀⡼⡀⠀⠀⠀⠀⠀⠀⢀⡤⠞⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠷⢄⡀⠀⠀⢠⠂⠘⣦⡀⠀⠘⡆⠀⠀⠀⠀⢸⠀⠀⡇⠀⠀⠀⠀⢠⡃⠀⢀⣸⠃⠰⠄⠀⠀⢀⡠⠶⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠶⢔⡁⠀⠀⠹⡉⢓⠆⣧⠀⠀⠀⠀⢸⠀⠘⡇⠀⠀⠀⠀⣸⢰⡞⢉⡟⣠⣾⣿⡢⡖⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠲⢔⡀⢣⡸⠀⠹⡄⠀⠀⠀⢸⠀⠰⡇⠀⠀⠀⢀⠇⠀⢧⣼⣿⣿⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠺⢧⠄⠀⢣⠀⠀⠀⢸⡆⠈⡇⠀⠀⠀⡼⠁⠀⣿⡿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡦⡀⠀⢸⠂⠀⡇⠀⢀⣴⠃⠀⡄⡀⢀⣀⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡈⠀⢼⠁⠀⣧⢢⣿⡏⠀⡔⢾⠋⢹⡩⡩⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧⠀⢸⠀⠀⡿⣸⡿⠀⣘⡶⠈⠍⡁⣇⣾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡆⢸⠂⠀⣇⣿⠃⠰⠚⠈⠁⠉⠐⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣻⠀⠘⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⠆⠀⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
https://www.deviantart.com/argonaut11/art/Argentea-Darling-In-The-Franxx-Phone-wallpaper-744586505
*/

const fs = require('fs');       //For fuck's sake (storage)
const zlib = require("zlib");   //For reading apol POST responses (really)
const {app, BrowserWindow, ipcMain} = require('electron');
const { assert } = require('console');

const REQ_DEBUG = false;
const chlorophytum = require("./chlorophytum.js"); // Just to provide storage access for cookies
const delphinium = require('./delphinium.js');
let mainWindow;

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		},
		autoHideMenuBar: true
	});

	mainWindow.loadFile('./src/client/index.html');
}

app.whenReady().then(() => {
	createWindow();
	start();
})

const CWD = app.getPath("userData");
let storage = {};
function loadStorage(){
	try {
		let f = fs.readFileSync(CWD + "/storage.json");
		if (f) storage = JSON.parse(f);
	} catch (e){
		console.log("No saved storages found, will load new");
	}
}
function saveStorage(){
	let s = JSON.stringify(storage)
	fs.writeFileSync(CWD + "/storage.json", s);
}

function setServiceKey(){
	delphinium.requestServiceKey().then((key)=>{
		if (key && key.authServiceKey){
			storage.serviceKey = key.authServiceKey;
			saveStorage();
		} else {
			//TODO: Crash the app if failed to acquire service key
		}
	});
}

function start(){
	loadStorage();

	chlorophytum.setStorage(storage, saveStorage);

	if (!storage.serviceKey){
		setServiceKey();
	}
}

ipcMain.on('strelitziaCommand', async (event, command) => {
	try {
		let r = await respondToCommand(command);
		
		event.sender.send("strelitziaResponse", r);
	} catch(e){
		sendStatusUpdate({
			modal: true,
			e: e
		});
	}
})

const RESPONSE_CODES = {
	ERROR: 0,
	AUTH: 1,
	CODE: 2,
	OK:   3,
	SELECT_TEAM: 4
}

const IAP_TYPE_C   = "consumable";
const IAP_TYPE_NC  = "nonConsumable";
const IAP_TYPE_RS  = "recurring";
const IAP_TYPE_NRS = "subscription";

const IAP_TYPE_NAMES = {
	"ITC.addons.type.consumable"    : IAP_TYPE_C,
	"ITC.addons.type.nonConsumable" : IAP_TYPE_NC,
	"ITC.addons.type.recurring"     : IAP_TYPE_RS,
	"ITC.addons.type.subscription"  : IAP_TYPE_NRS,
	"consumable"   : IAP_TYPE_C,
	"nonConsumable": IAP_TYPE_NC,
	"recurring"    : IAP_TYPE_RS,
	"subscription" : IAP_TYPE_NRS,
	"rs" : IAP_TYPE_RS,
	"c"  : IAP_TYPE_C,
	"nc" : IAP_TYPE_NC
}

function sendStatusUpdate(message){
	mainWindow.webContents.send("statusUpdate", message);
}

let lastSessionCheck = 0;
const SESSION_CHECK_COOLDOWN_MS = 120 * 1000;
async function respondToCommand(command){
	const CHECK_SESSION_NOT_REQUIRED = [
		"SERVICE",
		"LOGIN",
		"CODE",
		"SEL_TEAM",
		"SEL_APP"
	];

	let response = {
		code: RESPONSE_CODES.ERROR,
		message: "Error message unset"
	}

	let currentTime = Date.now();
	if (currentTime - lastSessionCheck > SESSION_CHECK_COOLDOWN_MS &&
		!CHECK_SESSION_NOT_REQUIRED.includes(command.command)){
		lastSessionCheck = currentTime;
		sendStatusUpdate("Checking session");
		let session = await delphinium.checkSession();
		if (!session){
			response.code = RESPONSE_CODES.AUTH;
			return response;
		}
		sendStatusUpdate("");
	}
	let defaultProgressUpdate = (progressList)=>{
		mainWindow.webContents.send("progressUpdate", progressList);
	}

	switch (command.command){
	case ("SERVICE"): {
		switch (command.options.message){
		case ("PRICES"): {
			if (storage.rsMatrix){
				return {
					rs: storage.rsMatrix,
					c: storage.rsMatrix
				};
			} else {
				return {
					error: "Authorize and select any app to download pricing matrixes"
				};
			}
		}
		case ("SIGNOUT"): {
			delete storage.cookies;
			delete storage.team;
			saveStorage();
			return("OK");
		}
		case ("RESET"): {
			storage = {};
			saveStorage();
			setServiceKey();
			return("OK");
		}
		}
		break;
	}
	case ("START"): {
		if (!storage.team){
			let teams = await delphinium.listTeams();
			if (!teams || teams.length == 0){
				response.code = RESPONSE_CODES.ERROR;
				response.message = "Requsted teams, but can't parse response";
				return response;
			} else if (teams.length == 1) {
				await delphinium.sendTeam(teams[0].providerId);
				//storage.team = teams[0].id;
				response.code = RESPONSE_CODES.OK;
				return response;
			} else {
				response.code = RESPONSE_CODES.SELECT_TEAM;
				response.teams = teams;
				return response;
			}
		}

		response.code = RESPONSE_CODES.OK;
		return response;
	}
	case ("LOGIN"): {
		let loginResponse = await delphinium.login(command.options.login, command.options.password);

		switch (loginResponse){
			case ("CODE"): {
				response.code = RESPONSE_CODES.CODE;
				return response;
			}
			case ("AUTH"): {
				response.code = RESPONSE_CODES.AUTH;
				return response;
			}
			case ("OK"): {
				response.code = RESPONSE_CODES.OK;
				return response;
			}
			default: {
				response.code = RESPONSE_CODES.ERROR;
				response.message = loginResponse;
				return response;
			}
		}
	}
	case ("CODE"): {
		let codeResponse = await delphinium.sendCode(command.options.code);
		if (codeResponse){
			//Repeat start sequence in order to check teams and obtain active session
			let fakeStartCommand = {
				command: "START",
				options: {}
			}
			let final = await respondToCommand(fakeStartCommand);
			return final;
		} else {
			response.code = RESPONSE_CODES.CODE;
		}
		return response;
	}
	case ("SEL_TEAM"): {
		//storage.team = command.options.id;
		//saveStorage();
		await delphinium.sendTeam(command.options.providerId);
		response.code = RESPONSE_CODES.OK;
		return response;
	}
	case ("APPS"): {
		sendStatusUpdate("Downloading list of apps");
		let apps = await delphinium.listApps();
		if (apps){
			response.code = RESPONSE_CODES.OK;
			response.apps = apps;
			return response;
		} else {
			response.code = RESPONSE_CODES.ERROR;
			return response;
		}
	}
	case ("SEL_APP"): {
		if (!storage.rsMatrix || !storage.cMatrix || !storage.countryCodes || !storage.cpId){
			sendStatusUpdate("Downloading matrices");
			matrices = await delphinium.downloadMatrices(command.options.appId);
			if (matrices[0]){
				storage.rsMatrix = matrices[0];
			}
			if (matrices[1]){
				storage.cMatrix = matrices[1];
			}
			if (matrices[2]){
				storage.countryCodes = matrices[2];
			}
			if (matrices[3]){
				storage.cpId = matrices[3];
			}
			saveStorage();
			if (matrices[0] && matrices[1] && matrices[2])
				sendStatusUpdate("Storage updated");
			else {
				//sendStatusUpdate("Failed to download some matrices, please restart");
				response.code = RESPONSE_CODES.ERROR;
				response.message = "Failed to download some matrices, please restart";
				return response;
			}
		}
		response.code = RESPONSE_CODES.OK;
		response.rsMatrix = storage.rsMatrix;
		response.cMatrix = storage.cMatrix;
		return response;
	}
	case ("DL_IAPS"): {
		sendStatusUpdate("Downloading IAPs");
		let result = await delphinium.downloadIAPs(command.options.appId, storage);
		if (result){
			sendStatusUpdate("Downloaded");
			return result;
		} else {
			sendStatusUpdate("Failed to download");
			return null;
		}
	}
	case ("BRIEF_IAPS"): {
		let result = await delphinium.briefIAPs(command.options.appId)
		if (result){
			sendStatusUpdate("Downloaded " + ((result.length == 1) ? result.length + " IAP" : result.length + " IAPs"));
			response.iaps = result;
			response.code = RESPONSE_CODES.OK;
			return response;
		} else {
			sendStatusUpdate("Failed to download");

			response.code = RESPONSE_CODES.ERROR;
			return response;
		}
	}
	case ("CREATE_IAP"): {
		await delphinium.createIAPs(command.options.orders, command.options.appId, storage, defaultProgressUpdate, command.options.overwriteAllowed, command.options.sequentialMode);
		
		response.code = RESPONSE_CODES.OK;
		return response;
	}
	case ("EDIT_IAP"): {
		await delphinium.editIAPs(command.options.orders, command.options.appId, storage, defaultProgressUpdate, command.options.sequentialMode);

		response.code = RESPONSE_CODES.OK;
		return response;
	}
	case ("SWITCH_IAPS"): {
		await delphinium.switchIAPsVersion(command.options.orders, command.options.appId, defaultProgressUpdate, command.options.rejectedOnly);

		response.code = RESPONSE_CODES.OK;
		return response;
	}
	case ("UPLOAD"): {
		await delphinium.uploadScreenshots(command.options.appId, command.options.files, defaultProgressUpdate);

		response.code = RESPONSE_CODES.OK;
		return response;
	}
	default:
		response.code = RESPONSE_CODES.ERROR;
		response.message = "Unknown command";
		return(response);
	}
}