/*
Strelitzia.js

Strelitzia is main module responsible for wrapping platform-depending code and provide Delphinium functionality to GUI

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

const chlorophytum = require("./chlorophytum.js");
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
		}
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

function start(){
	loadStorage();

	chlorophytum.setStorage(storage, saveStorage);

	if (!storage.serviceKey){
		delphinium.requestServiceKey().then((key)=>{
			if (key && key.authServiceKey){
				storage.serviceKey = key.authServiceKey;
				saveStorage();
			} else {
				//TODO: Crash the app if failed to acquire service key
			}
		});
	}

	let path = process.execPath;
	path = path.substring(0, path.lastIndexOf("/") + 1);

	console.log("Current path " + process.cwd());
}

ipcMain.on('strelitziaCommand', async (event, command) => {
	let r = await respondToCommand(command);
	event.sender.send("strelitziaResponse", r);
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

async function respondToCommand(command){
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	let response = {
		code: RESPONSE_CODES.ERROR,
		message: "Error message unset"
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
			break;
		}
		case ("SIGNOUT"): {
			delete storage.cookies;
			delete storage.team;
			saveStorage();
			return("OK");
			break;
		}
		case ("RESET"): {
			storage = {};
			saveStorage();
			let key = await chlorophytum.sendServiceKeyRequest();
			setServiceKey(key);
			return("OK");
			break;
		}
		}
		break;
	}
	case ("START"): {
		let session = await delphinium.checkSession();
		if (session){
			if (!storage.team){
				let teams = await delphinium.listTeams();
				if (!teams || teams.length == 0){
					response.code = RESPONSE_CODES.ERROR;
					response.message = "Requsted teams, but can't parse response";
					return response;
				} else if (teams.length == 1) {
					storage.team = teams[0].id;
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
		} else {
			response.code = RESPONSE_CODES.AUTH;
			return response;
		}
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
		storage.team = command.options.id;
		saveStorage();
		response.code = RESPONSE_CODES.OK;
		return response;
	}
	case ("APPS"): {
		let session = await delphinium.checkSession();
		if (!session){
			response.code = RESPONSE_CODES.AUTH;
			return response;
		}

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
		if (!storage.rsMatrix || !storage.cMatrix || !storage.countryCodes){
			sendStatusUpdate("Downloading matrices");
			matrices = await delphinium.downloadMatrices(appId);
			if (matrices[0]){
				storage.rsMatrix = matrices[0];
			}
			if (matrices[1]){
				storage.cMatrix = matrices[1];
			}
			if (matrices[2]){
				storage.countryCodes = matrices[2];
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
		let session = await delphinium.checkSession();
		if (!session){
			response.code = RESPONSE_CODES.AUTH;
			return response;
		}

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
	case ("CREATE_IAP"): {
		let session = await delphinium.checkSession();
		if (!session){
			response.code = RESPONSE_CODES.AUTH;
			return response;
		}

		let progressUpdate = (progressList)=>{
			mainWindow.webContents.send("progressUpdate", progressList);
		}
		return delphinium.createIAPs(command.options.orders, command.options.appId, storage, progressUpdate, true);
	}
	/*scase ("EDIT_IAP"): {
		// command.options.orders
		// command.options.appId
		response.code = RESPONSE_CODES.OK;
		return response;
	}
	case ("RECREATE"): {
		//let found = await obtainFreshPurchase(command.options.appId, order.bundle, 7);
		let iapsResponse = await chlorophytum.sendIAPsRequest(command.options.appId);

		let iapsParsed = JSON.parse(iapsResponse).data;
		for (let i of iapsParsed){
			//i.iTunesConnectStatus == 
			console.log(i.versions[i.versions.length - 1].itunesConnectStatus);
			continue;

			let detailsResponse = await chlorophytum.sendIAPDetailsRequest(command.options.appId, i.adamId);
			let product = JSON.parse(detailsResponse).data;
			let lc = product.versions[0].details.value[0].value.localeCode;
			if (lc == "en-US"){
				product.versions[0].details.value[0].value.localeCode = "en-CA";
			} else {
				product.versions[0].details.value[0].value.localeCode = "en-US";
			}
			
			let editResponse = await chlorophytum.sendIAPDetailsRefresh(freshProduct, command.options.appId, found.adamId);
			if (editResponse == "OK")
				console.log(product.productId.value + ": Product locale edited");
			else
				console.log(product.productId.value + ": Failed to edit product locale");
		}
		response.code = RESPONSE_CODES.OK;
		return (response);
	}*/
	default:
		response.code = RESPONSE_CODES.ERROR;
		response.message = "Unknown command";
		return(response);
	}
}