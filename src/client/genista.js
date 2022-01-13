/*
Genista.js

Genista is UI renderer

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⠤⠐⠒⠈⠉⠉⠉⠉⠑⠒⠂⠤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠁⢀⣠⠤⠔⠒⠒⠒⠒⠒⠶⠤⢤⣄⡀⠉⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠊⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣷⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⠿⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⢱⠀⠈⠢⢀⣰⣿⣿⡧⠤⠤⣤⣴⣶⣿⡿⠛⠁⠀⠏⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠉⠈⠉⠁⠀⠀⠈⠉⠉⠉⠀⠀⠀⢀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⢅⡀⠀⠀⣀⠄⠢⢀⣀⣀⡀⠐⠠⣀⠀⠀⢀⡨⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⡂⠁⠈⠀⠀⠀⠀⠀⠀⠀⠀⠃⠈⢒⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠖⠙⠦⡀⡇⠀⡗⢤⡀⠀⠀⠀⠀⢀⠤⢲⠀⢸⢀⠴⠋⠢⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠋⠀⠀⠀⠀⠈⠀⠀⡃⠀⠈⠓⠤⠤⠚⠁⠀⢸⠀⠸⠁⠀⠀⠀⠀⠱⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠜⠑⠢⢤⣀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⢰⠉⠲⢄⡀⠀⠀⢀⡠⠖⠉⡆⠀⠀⠀⠀⠀⠀⣴⣶⠇⠀⠀⠀⠀⣀⡤⠔⠊⢣⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠋⠠⠊⠐⠢⠌⡙⢢⠀⠀⠀⡇⠀⠀⠀⠀⠀⢸⠀⢸⠀⠀⠀⠈⠑⠊⠁⠀⠀⠀⡇⠀⡆⠀⠀⠀⠀⣿⣿⠀⠀⠀⡔⢋⠡⠐⠀⣗⠀⠑⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠁⡐⠁⠀⠀⠀⠀⠈⠑⢧⠀⠀⠣⣀⠀⠀⠀⠀⢸⠀⢸⣤⣤⣄⣀⣀⣠⣤⣤⣤⣤⡇⠀⡇⠀⢀⣤⣾⣿⠟⠀⠀⡜⠊⠀⠀⠀⠐⣿⣾⣆⠈⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⠚⠀⠀⠀⠀⠀⠀⠀⠀⠈⣆⠀⠀⠈⠳⣄⠀⢠⣾⠀⢸⠯⠛⠛⠚⠛⠛⠛⠛⠛⠿⡃⠀⣧⣶⣿⣿⠟⠁⠀⠀⡰⠁⠀⠀⠀⠀⠀⠘⣿⣿⣶⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡆⠀⠀⠀⠀⠑⠾⢻⠀⠰⠖⠒⣒⠒⠲⠖⢒⣒⠒⠲⠇⠀⡟⠿⠋⠀⠀⠀⠀⣰⠁⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⠿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠳⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠃⠀⠀⠀⠀⠀⢀⠜⠀⠀⢠⣃⠤⠤⠤⣤⣤⣤⣐⡄⡆⠀⠣⡀⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⠀⠀⠀⣤⣾⣿⣿⡿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠓⢤⡀⠀⠀⠀⠀⢀⡰⠁⠀⠀⡔⣄⠀⠀⢧⡀⠠⣠⠉⠀⠀⠀⠀⠀⠀⠀⠀⢉⣇⣼⣥⡝⠀⠀⡠⣦⠀⠀⠘⢆⠀⠀⠀⢰⣾⢿⡭⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢄⠤⠖⠊⠁⠀⢀⡞⠀⠈⠣⡀⠀⠑⢄⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⡿⠋⠀⢀⠾⢁⣿⣧⡀⠀⠈⠑⠢⠤⡼⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠞⠀⠀⠀⠀⠙⢆⠀⠈⠳⣄⠀⠀⢠⢤⣤⣴⣿⣿⣿⠟⠀⠀⡴⠃⠀⢸⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠃⠑⢦⡀⠀⠀⠀⠀⠀⠀⠀⢀⠎⠀⠀⠀⠀⠀⠀⠀⠳⡀⠀⠈⠣⡰⠁⠀⣿⣿⣿⠟⠁⠀⢠⡞⠀⠀⠀⣾⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⢀⠴⠋⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⠀⠀⠀⢘⡄⠀⠀⠀⠀⠀⢠⠎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢆⠀⠀⠈⠉⠉⠉⠉⠁⠀⠀⣴⠃⠀⠀⠀⠀⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⢸⠁⠀⢸⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠇⠀⠀⠀⠀⣇⠀⠀⠀⠀⢠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⠤⠤⠤⠤⠤⠤⠤⠤⠾⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⡼⠀⢀⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡸⠀⠀⠀⠀⠀⢸⡀⠀⠀⢀⡎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠈⢻⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⢀⡇⠀⢸⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⡤⠃⠀⠀⠀⠀⠀⠀⡇⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⢡⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⡇⠀⠀⢸⠀⠀⠈⢿⣿⣿⠛⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⢹⠀⠀⡼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣇⠀⠀⡯⠀⠀⠀⠈⡿⠃⠀⠀⠑⣦⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡄⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⡄⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⠀⢰⠇⠀⠀⠀⠀⠀⠀⢀⣤⣾⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠃⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⠀⢸⡄⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⢸⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡤⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠓⢄⠀⠀⠀⠀⠀⠀⠠⣿⣿⣿⣿⣿⣿⡆⠀⡇⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⢄⡀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡇⠀⡇⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⡄⠀⠀⠀⣿⣿⣿⣿⣿⣿⡇⠀⡇⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢸⠅⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣇⠀⠀⠀⣿⣿⣿⣿⣿⣿⡇⠀⢹⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⠿⡆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⡄⠀⠈⠉⠐⠒⠂⠤⠤⠀⣀⡇⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⠀⠀⠀⣿⣿⣿⣿⣿⣿⣇⠀⢸⣀⠀⠤⠤⠐⠒⠁⠉⠁⠀⢰⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢳⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⠀⠈⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⡎⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠦⢤⣀⣀⡀⠀⠀⠀⠀⡜⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⠀⠀⢇⠀⠀⠀⠀⣀⣀⣀⠤⠼⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠦⣀⠉⢩⠓⠃⠀⠀⡇⠒⠠⠤⠤⢀⣀⣀⣀⢸⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⠇⣀⣀⣿⡿⠿⠿⠟⠛⢹⠀⠀⠘⠻⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⠞⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⢰⠈⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠁⡆⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠻⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡗⠢⠤⠄⣀⣀⣀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠇⠀⠀⣀⣀⣀⠠⠤⠴⢾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠿⣲⣶⣦⣤⣤⣀⣉⣽⠋⠉⠉⠓⠀⠀⠒⠒⠒⠒⠒⠒⠒⠒⠒⠒⠒⠒⠒⠒⠊⣉⣩⡯⠉⣩⣤⣴⣶⣶⣾⣿⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠙⠚⠚⠻⠥⠾⡿⢿⣯⣻⣿⣿⣿⣿⣿⣛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠧⠚⠛⠛⠋⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⡀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⡏⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢫⡁⠐⠒⠒⠒⢺⠀⠀⠀⠀⡗⠒⠒⠒⠋⢉⠟⠀⠀⢁⡄⡒⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⣀⣀⣀⣀⣸⠀⠀⠀⠀⣇⣀⣀⣀⣠⠎⠀⢄⠄⠀⠀⠀⠠⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢆⠀⠀⢸⠀⠀⠀⠀⡇⢀⣾⡿⠃⠀⠈⠈⠁⠉⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⡄⢸⠀⠀⠀⠀⣇⣾⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠺⠀⠀⠀⠀⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
https://www.deviantart.com/argonaut11/art/Genista-Darling-In-The-Franxx-Phone-Wallpaper-744587004
*/

const {remote, ipcRenderer} = require('electron');

const COMMANDS = {
	start: {
		command: "START",
		options: {
		}
	},
	login: {
		command: "LOGIN",
		options: {
			login: "",
			password: ""
		}
	},
	code: {
		command: "CODE",
		options: {
			code: "000000"
		}
	},
	selectTeam: {
		command: "SEL_TEAM",
		options: {
			teamName: "",
			teamId: "0"
		}
	},
	apps: {
		command: "APPS",
		options: {
		}
	},
	selectApp: {
		command: "SEL_APP",
		options: {
			appId: "0"
		}
	},
	create: {
		command: "CREATE_IAP",
		options: {
			appId: "0",
			//defaultFamilyName: "Subscriptions",
			orders: []
		}
	},
	edit: {
		command: "EDIT_IAP",
		options: {
			appId: "0",
			orders: []
		}
	},
	recreate: {
		command: "RECREATE",
		options: {
			appId: "0",
			orders: []
		}
	},
	service: {
		command: "SERVICE",
		options: {
			message: ""
		}
	},
	downloadIAPs: {
		command: "DL_IAPS",
		options: {
			appId: "0"
		}
	},
	briefingIAPs: {
		command: "BRIEF_IAPS",
		options: {
			appId: "0"
		}
	},
	switch: {
		command: "SWITCH_IAPS",
		options: {
			appId: "0",
			orders: []
		}
	}
};
const RESPONSE_CODES = {
	ERROR: 0,
	AUTH: 1,
	CODE: 2,
	OK:   3,
	SELECT_TEAM: 4
};
let selectedApp = null;

let radios = [];

function status(message){
	document.getElementById("status").textContent = message;
}

function hideAllDialogs(){
	let ds = document.getElementsByClassName("dialog");
	for (let d of ds){
		d.style.display = "none";
	}
}

function onRadioChange(group, selected){
	for (let option of radios[group]){
		if (option.id == selected)
			option.className = "xradio xradio_selected";
		else
			option.className = "xradio";
	}
}

function initRadio(host){
	let first = null;
	
	//if (radios[host.id]) return;

	radios[host.id] = [];
	for (let option of host.children){
		if (option.className == "xradio"){
			if (!first){
				first = option;
			}
			option.onclick = ()=>{
				onRadioChange(host.id, option.id);
			};
			radios[host.id].push(option);
		}
	}
	if (first){
		onRadioChange(host.id, first.id);
	}
}

const IAP_TYPES  = ["rs", "nc", "c"];
const IAP_DURS   = ["1w", "1m", "2m", "3m", "6m", "1y"];
const IAP_TRIALS = ["off", "3d"];//, "1w", "1m", "2m", "3m", "6m", "1y"];

function refreshCreateConfirmer(s){
	if (s.value >= 98){
		s.value = 100;
		s.style.backgroundColor = "#DA4000";
		s.disabled = true;
		forceCreate();
	}
}
function forceCreate(){
	let overwriteCheck = document.getElementById("dialog_create_overwrite");
	let sequentialCheck = document.getElementById("dialog_create_sequential");
	createIAPs(overwriteCheck.checked, sequentialCheck.checked);
}

function resetCreateConfirmer(s){
	if (s.value < 98)
		s.value = 0;
}

function refreshEditConfirmer(s){
	if (s.value >= 98){
		s.value = 100;
		s.style.backgroundColor = "#DA4000";
		s.disabled = true;
		forceEdit();
	}
} 
function forceEdit(){
	editIAPs();
}

function resetEditConfirmer(s){
	if (s.value < 98)
		s.value = 0;
}

function refreshSwitchConfirmer(s){
	if (s.value >= 98){
		s.value = 100;
		s.style.backgroundColor = "#DA4000";
		s.disabled = true;
		forceSwitch();
	}
}
function forceSwitch(){
	switchIAPs();
}

function resetSwitchConfirmer(s){
	if (s.value < 98)
		s.value = 0;
}

function unlockConfirmer(s){
	s.value = 0;
	s.style.backgroundColor = "#333";
	s.disabled = false;
}

function switchMode(e){
	if (!e.target.classList.contains("xradio"))
		return;
	let parent = e.target.parentElement;
	for (let sibs of parent.children){
		sibs.className = "xradio";
	}
	e.target.className = "xradio xradio_selected";

	let dialogCreate = document.getElementById("dialog_main_create");
	let dialogEdit = document.getElementById("dialog_main_edit");
	let dialogSwitch = document.getElementById("dialog_main_switch");
	dialogCreate.style.display = "none";
	dialogEdit.style.display = "none";
	dialogSwitch.style.display = "none";

	switch (e.target.id){
		case("xr_create"): {
			dialogCreate.style.display = "block";
			break;
		}
		case("xr_edit"): {
			dialogEdit.style.display = "block";
			break;
		}
		case("xr_switch"): {
			dialogSwitch.style.display = "block";
			break;
		}
	}
}

let tables = {
	"spreadsheet_create": null,
	"spreadsheet_edit": null
}
tableFiles = [];
function initTable(id, screenshotColumn, rsMatrix, cMatrix){
	if (tables[id]) {
		tables[id].destroy(); 
	}

	let rsPrices = [];
	for (let rsp of rsMatrix){
		rsPrices.push(rsp.price);
	}
	let cPrice = [];
	for (let cp of cMatrix){
		cPrice.push(cp.price);
	}

	let settings = {
		data: [],
		rowHeaders: true,
		colHeaders: ["Type", "Reference Name", "Bundle Suffix", "Price (RS)", "Price (C/NC)", "Duration", "Trial", "Name (en-US)", "Description (en-US)"],
		columns: [
			{
				type: "dropdown",
				source: IAP_TYPES
			},
			{},
			{},
			{
				type: "dropdown",
				source: rsPrices
			},
			{
				type: "dropdown",
				source: cPrice
			},
			{
				type: "dropdown",
				source: IAP_DURS
			},
			{
				type: "dropdown",
				source: IAP_TRIALS
			},
			{},
			{}
		],
		minSpareRows: 1,
		licenseKey: "non-commercial-and-evaluation"
	};
	if (screenshotColumn){
		settings.colHeaders.push("Screenshot");
		settings.columns.push({
			type: "dropdown",
			source: (query, callback)=>{
				let names = [];
				for (let file of tableFiles){
					names.push(file.name);
				}
				callback(names);
			}
		});
	} 
	let container = document.getElementById(id);
	tables[id] = new Handsontable(container, settings);
}

function start(){
	let subs = [
		"Because launching Spaceship is called rocket science",
		"[eq",
		"Ракеты нет, скачем на батуте"
	];
	let names = [
		"Strelitzia",
		"סטרליציה",
		"Wishmaster"
	];
	let backs = [
		"url(\"./backs/backS.jpg\")",
		"url(\"./backs/backS.jpg\")",
		"url(\"./backs/backS2.jpg\")",
		"url(\"./backs/backS2.jpg\")",
		"url(\"./backs/backD.jpg\")",
		"url(\"./backs/backA.jpg\")",
		"url(\"./backs/backG.jpg\")",
		"url(\"./backs/backC.jpg\")"
	];
	document.getElementById("headerText").textContent = names[Math.floor(Math.random() * names.length)] + " " + remote.app.getVersion();
	document.getElementById("headerSub").textContent = subs[Math.floor(Math.random() * subs.length)];
	document.addEventListener("keydown", (e) => {
		if (e.key == "y" && e.repeat)
			for (let slider of document.getElementsByClassName("slider"))
				slider.classList.add("easterSlider");
	});
	document.addEventListener("keydown", (e) => {
		if (e.key == "F12")
			remote.getCurrentWindow().openDevTools();
		if (e.key.startsWith("Alt"))
			document.querySelectorAll(".hiddenByShift").forEach((e)=>{e.style.display = "block"});
	});
	document.addEventListener("keyup", (e) => {
		if (e.key.startsWith("Alt"))
			document.querySelectorAll(".hiddenByShift").forEach((e)=>{e.style.display = "none"});
	});
	
	document.body.style.backgroundImage = backs[Math.floor(Math.random() * backs.length)];
	sendStart();
}

function startLogin(){
	status("");
	hideAllDialogs();
	document.getElementById("dialog_login").style.display = "block";
	document.getElementById("dialog_login_login").focus();
}
function relogin(){
	startLogin();
}

function startCodeRequest(){
	status("");
	hideAllDialogs();
	document.getElementById("dialog_code").style.display = "block";
	document.getElementById("dialog_code_code").focus();
}

function startTeamSelect(teams){
	status("Select team:");
	hideAllDialogs();
	let teamSelector = document.getElementById("dialog_team");
	teamSelector.innerHTML = "";
	for (let t of teams){
		let option = document.createElement("div");
		option.className = "xbutton";
		option.textContent = t.name + " : " + t.id;
		option.onclick = () => {selectTeam(t.id);};
		teamSelector.appendChild(option);
	}
	teamSelector.style.display = "inline-block";
}

function startAppSelect(apps){
	status("Select app:");
	hideAllDialogs();
	let appSelector = document.getElementById("dialog_apps_list");
	appSelector.innerHTML = "";
	for (let a of apps){
		let option = document.createElement("div");
		option.className = "xbutton";
		option.textContent = a.name + " : " + a.bundle;
		option.onclick = () => {selectApp(a);};
		appSelector.appendChild(option);
	}
	document.getElementById("dialog_apps").style.display = "inline-block";
}

function searchUpdate(){
	let searchInput = document.getElementById("dialog_apps_search");
	let appSelector = document.getElementById("dialog_apps_list");
	let query = searchInput.value.toLowerCase();
	for (let item of appSelector.children){
		if (item.textContent.toLowerCase().includes(query)){
			item.style.display = "block";
		} else {
			item.style.display = "none";
		}
	}
}

function isValid(order, appBundle){
	if (!["rs", "nc", "c"].includes(order.type)){
		showModal("Unknown IAP type for " + order.bundle);
		return false;
	}
	
	if (!order.refname || order.refname.length < 2){
		showModal("Reference name is too short for " + order.bundle);
		return false;
	}
	
	if (order.bundle.length < 2){
		showModal("Bundle name " + order.bundle + " is too short");
		return false;
	}

	if (order.version.name.length < 2){
		showModal("Localized name is too short for " + order.bundle);
		return false;
	}

	if (order.version.desc.length < 2){
		showModal("Localized description is too short for " + order.bundle);
		return false;
	}

	if (order.type == "rs"){
		if (!["1w", "1m", "2m", "3m", "6m", "1y"].includes(order.duration)){
			showModal("Unknown duration type for " + order.bundle);
			return false;
		}

		if (order.trial && !["off", "3d", "1w", "1m", "2m", "3m", "6m", "1y"].includes(order.trial)){
			showModal("Unknown trial type for " + order.bundle);
			return false;
		}
	}

	return true;
}

function collectOrders(sheet, appBundle, forEditing = true){
	let source = sheet.getData();
	let harvested = [];
	for (let row of source){
		if (!row[2]) continue;

		let productId = row[2];
		if (!productId.startsWith(appBundle)){
			if (productId.startsWith("."))
				productId = appBundle + productId;
			else {
				if (productId.startsWith("com.")){
					showModal(productId + " does not start with app bundle name");
					return null;
				}
				productId = appBundle + "." + productId;
			}
		}

		let entry = {
			type:    row[0],
			refname: row[1],
			bundle:  productId,
	
			version: {
				name: row[7],
				desc: row[8]
			}
		};
		if (entry.type == "rs"){
			entry.duration = row[5];
			entry.trial    = row[6];
			entry.price    = row[3];
		} else {
			entry.price    = row[4];
		}
		if (row[9]){
			for (let file of tableFiles){
				if (file.name == row[9]){
					entry.screenshot = file;
					break;
				}
			}
		}
		if (!forEditing || isValid(entry, appBundle))
			harvested.push(entry);
		else {
			return null;
		}
	}
	return harvested;
}

function addOrders(sheet, data){
	let row = sheet.countRows() - 1;
	let newCells = [];
	for (let entry of data){
		newCells.push([row, 0, entry.type]);
		newCells.push([row, 1, entry.refname]);
		newCells.push([row, 2, entry.bundle]);
		newCells.push([row, 7, entry.version.name]);
		newCells.push([row, 8, entry.version.desc]);
		if (entry.type == "rs"){
			newCells.push([row, 3, entry.price]);
			newCells.push([row, 5, entry.duration]);
			newCells.push([row, 6, entry.trial]);
		} else {
			newCells.push([row, 4, entry.price]);
		}
		row += 1;
	}
	sheet.setDataAtCell(newCells);
}
function addFromFile(file){
	function processCSV(rawData){
		let ignoreRows = [];
		for (let e of rawData.errors){
			ignoreRows.push("" + e.row);
		}
		let processed = [];
		for (let i in rawData.data){
			if (ignoreRows.includes(i)) continue;

			let row = rawData.data[i];
			let data = {
				type:    row["Type"].toLowerCase(),
				refname: row["Reference Name"],
				bundle:  row["Bundle Suffix"],
				price:   row["Price (USD)"],

				version: {
					name: row["Name (en-US)"],
					desc: row["Desc (en-US)"]
				}
			};
			if (data.type == "rs"){
				data.duration = row["Duration"];
				data.trial    = row["Trial"] == "" ? "off" : row["Trial"];
			}
			processed.push(data);
		}
		addOrders(tables["spreadsheet_create"], processed);
	}

	Papa.parse(file, {
		header: true,
		complete: function(results) {
			processCSV(results);
		}
	});
}
function startMainDialog(cMatrix, rsMatrix, appBundle, appId){
	document.getElementById("dialog_main_appname").textContent = appBundle;
	status("");
	hideAllDialogs();
	initTable("spreadsheet_create", false, rsMatrix, cMatrix);
	initTable("spreadsheet_edit", true, rsMatrix, cMatrix);
	let dialog = document.getElementById("dialog_main");
	dialog.style.display = "block";
}

function loginComplete(){
	listApps();
}


function processCommonResponses(response){
	switch(response.code){
	case(RESPONSE_CODES.AUTH):
		startLogin();
		return true;
	case(RESPONSE_CODES.ERROR):
		status("E: " + response.message);
		return true;
	default:
		return false;
	}
}

function showModal(message){
	let back = document.createElement("div");
	back.className = "modal";

	let box = document.createElement("div");
	box.className = "modal-content";

	let text = document.createElement("div");
	text.textContent = message;

	let close = document.createElement("div");
	close.className = "xbutton";
	close.textContent = "close";
	let closer = ()=>{
		back.remove();
	};
	back.onclick = closer;
	close.onclick = closer;

	box.appendChild(text);
	box.appendChild(close);
	back.appendChild(box);

	document.documentElement.appendChild(back);
}

function servicePrices(){
	let c = COMMANDS.service;
	c.options.message = "PRICES";
	sendCommand(c, (r)=>{
		if (r.error)
			showModal(r.error);
		else {
			let result = "Subscription prices: \n";
			for (let item of r.rs){
				result += item.price + "$\n";
			}
			result += "\n Consumable and Non-Consumable prices: \n"
			for (let item of r.c){
				result += item.price + "$\n";
			}
			showModal(result);
		}
	});
}

function serviceSignout(){
	let c = COMMANDS.service;
	c.options.message = "SIGNOUT";
	sendCommand(c, (r)=>{
		start();
	});
}

function serviceReset(){
	let c = COMMANDS.service;
	c.options.message = "RESET";
	sendCommand(c, (r)=>{
		showModal("Settings cleared");
		start();
	});
}

function sendStart(){
	status("Fetching available sessions...");
	let message = COMMANDS.start;

	sendCommand(message, (r)=>{
		switch(r.code){
		/*case(RESPONSE_CODES.AUTH):
			//Overriden by common responses
			startLogin();
			break;*/
		case(RESPONSE_CODES.OK):
			loginComplete();
			break;
		case(RESPONSE_CODES.SELECT_TEAM):
			startTeamSelect(r.teams);
			break;
		case(RESPONSE_CODES.AUTH):
			status("Auth failed");
			break;
		default:
			status(r);
		}
	});

	return false;
}

function sendLogin(){
	status("Signing in...");
	let l = document.getElementById("dialog_login_login").value;
	let p = document.getElementById("dialog_login_password").value;
	let message = COMMANDS.login;
	message.options.login = l;
	message.options.password = p;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.CODE):
				startCodeRequest();
				break;
			case(RESPONSE_CODES.AUTH):
				status("Incorrect login or password");
				break;
			case(RESPONSE_CODES.OK):
				status("Signed in without code");
				loginComplete();
				break;
			default:
				status(r);
		}
	});

	return false;
}

function sendCode(){
	status("Sending code...");
	let c = document.getElementById("dialog_code_code").value;
	let message = COMMANDS.code;
	message.options.code = c;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.CODE):
				status("Wrong Code");
				break;
			case(RESPONSE_CODES.SELECT_TEAM):
				startTeamSelect(r.teams);
				break;
			case(RESPONSE_CODES.OK):
				loginComplete();
				break;
			default:
				status(r);
		}
	});
	
	return false;
}

function selectTeam(id){
	status("");
	let message = COMMANDS.selectTeam;
	message.options.name = "unset";
	message.options.id = id;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				loginComplete();
				break;
			default:
				status(r);
		}
	});

	return false;
}

function listApps(){
	status("");
	hideAllDialogs();
	let message = COMMANDS.apps;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				startAppSelect(r.apps);
				break;
			default:
				status(r);
		}
	});

	for (let r of document.getElementsByClassName("xradio")){
		r.className = "xradio";
	}
	document.getElementById("dialog_create_confirmer").disabled = false;
	
	return false;
}

function selectApp(app){
	status("Loading");
	hideAllDialogs();
	selectedApp = app;

	let message = COMMANDS.selectApp;
	message.options.appId = app.id;

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				startMainDialog(r.cMatrix, r.rsMatrix, app.bundle, app.id);
				break;
			case(RESPONSE_CODES.AUTH):
				relogin();
				break;
			default:
				status(r);
		}
	})

	return false;
}

let defaultButtonColor;
let buttonsLocked = false;
let editButtonsLocked = false;
let switchButtonsLocked = false;
function createIAPs(overwriteAllowed, sequentialMode){
	if (buttonsLocked) return;
	buttonsLocked = true;
	let dialog = document.getElementById("dialog_progress");
	dialog.innerHTML = "";
	status("IAP creation process is initiated. Hover list items to see error messages.");
	
	let message = COMMANDS.create;
	message.options.appId = selectedApp.id;
	message.options.orders = collectOrders(tables["spreadsheet_create"], selectedApp.bundle);
	message.options.overwriteAllowed = overwriteAllowed;
	message.options.sequentialMode = sequentialMode;

	let button = document.getElementById("dialog_create_confirmer");

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				status("Finished");
				button.disabled = false;
				button.style.backgroundColor = "#333";
				button.value = 0;
				buttonsLocked = false;
				break;
			case(RESPONSE_CODES.AUTH):
				relogin();
				break;
			default:
				status(r);
		}
	})

	return false;
}
function editIAPs(){
	if (editButtonsLocked) return;
	editButtonsLocked = true;
	let dialog = document.getElementById("dialog_progress");
	dialog.innerHTML = "";
	status("IAP editing process is initiated. Hover list items to see error messages.");
	
	let message = COMMANDS.edit;
	message.options.appId = selectedApp.id;
	message.options.orders = collectOrders(tables["spreadsheet_edit"], selectedApp.bundle, false);

	let button = document.getElementById("dialog_edit_confirmer");

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				status("Finished");
				button.disabled = false;
				button.style.backgroundColor = "#333";
				button.value = 0;
				editButtonsLocked = false;
				break;
			case(RESPONSE_CODES.AUTH):
				relogin();
				break;
			case(RESPONSE_CODES.ERROR):
				status(r.message);
				break;
			default:
				status(r);
		}
	})

	return false;
}

function switchIAPs(){
	if (switchButtonsLocked) return;
	switchButtonsLocked = true;
	let dialog = document.getElementById("dialog_progress");
	dialog.innerHTML = "";
	status("IAP editing process is initiated. Hover list items to see error messages.");
	
	let message = COMMANDS.switch;
	message.options.appId = selectedApp.id;
	message.options.rejectedOnly = document.getElementById("dialog_switch_rejectedOnly").checked;

	let orders = [];
	for (let item of document.getElementById("dialog_switch_list").children){
		let checkbox = item.querySelector("input");
		if (item.dataset.bundle && checkbox.checked) {
			orders.push(item.dataset.bundle);
		}
	}
	message.options.orders = orders;

	let button = document.getElementById("dialog_switch_confirmer");

	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				status("Finished");
				unlockConfirmer(button);
				switchButtonsLocked = false;
				break;
			case(RESPONSE_CODES.AUTH):
				relogin();
				break;
			case(RESPONSE_CODES.ERROR):
				status(r.message);
				break;
			default:
				status(r);
		}
	})

	return false;
}

function downloadIAPs(){
	let message = COMMANDS.downloadIAPs;
	message.options.appId = selectedApp.id;

	status("Loading...")

	sendCommand(message, (r)=>{
		tables["spreadsheet_edit"].clear();
		addOrders(tables["spreadsheet_edit"], r);
	});

	return false;
}

function getDimensions(src){
	return new Promise((resolve)=>{
		let img = new Image();
	
		img.onload = function(){
			resolve({
				w: img.width,
				h: img.height
			});
		}
	
		img.src = src;
    });
}

function getScreenshotType(dimensions){
	for (let entry of SCREENSHOT_TYPES){
		for (let dim of entry.dimensions){
			if (dim[0] == dimensions.w && dim[1] == dimensions.h){
				return entry.type;
			}
		}
	}
	return null;
}

async function updateScreenshotData(){
	let files = document.getElementById("screenshotPicker").files;

	let arrays = [];
	let promises = [];
	for (let file of files){
		promises.push(file.arrayBuffer());
	}
	arrays = await Promise.all(promises);
	for (let i in arrays){
		let dimensions = await getDimensions(files[i].path);
		arrays[i] = {
			name: files[i].name, 
			bytes: new Uint8Array(arrays[i]),
			dimensions: dimensions,
			type: getScreenshotType(dimensions)
		};
	}

	tableFiles = arrays.filter(file => file.type);
}

const SWITCH_ITEM_ID_PREFIX = "dialog_switch_list_";
const SWITCH_CBOX_ID_PREFIX = "dialog_switch_list_cbox";
function downloadIAPsBriefing(){
	let message = COMMANDS.briefingIAPs;
	message.options.appId = selectedApp.id;

	status("Loading...")

	/*
	r.iaps = [
		{
			bundle
			rejected
		}
	]
	*/
	sendCommand(message, (r)=>{
		switch(r.code){
			case(RESPONSE_CODES.OK):
				let list = document.getElementById("dialog_switch_list");
				list.innerHTML = "";

				for (let iap of r.iaps){
					let item = document.createElement("div");
					item.id = SWITCH_ITEM_ID_PREFIX + iap.bundle;
					item.dataset.bundle = iap.bundle;
					
					let checkbox = document.createElement("input");
					checkbox.type = "checkbox";
					checkbox.id = SWITCH_CBOX_ID_PREFIX + iap.bundle
					checkbox.checked = iap.rejected;

					let checkLabel = document.createElement("label");
					checkLabel.setAttribute("for", checkbox.id);
					checkLabel.textContent = iap.bundle

					item.appendChild(checkbox);
					item.appendChild(checkLabel);
					list.appendChild(item);
				}
				break;
			case(RESPONSE_CODES.ERROR):
				status(r.message);
				break;
			default:
				status(r);
		}
	});

	return false;
}

ipcRenderer.on("statusUpdate", (event, arg) => {
	if (arg.modal)
		showModal(arg.e);
	else 
		status(arg);
});
ipcRenderer.on("progressUpdate", (event, arg) => {
	const ICON_INITIAL = "⬜";
	const ICON_INPROGRESS = "💫";
	const ICON_OK = "✅";
	const ICON_FAIL = "❌";
	const ICON_WARNING = "⚠️";
	const ICON_UNKNOWN = "❓";
	const ICON_APOL = "🏳️‍🌈";
	function iconByStatus(status){
		switch (status){
			case ("initial"):      return ICON_INITIAL + " ";
			case ("inprogress"):   return ICON_INPROGRESS + " ";
			case ("done_ok"):      return ICON_OK + " ";
			case ("done_warning"): return ICON_WARNING + " ";
			case ("done_fail"):    return ICON_FAIL + " ";
			case ("done_badapol"): return ICON_APOL + " ";
			default:               return ICON_UNKNOWN + " ";
		}
	}

	const ID_PREFIX = "progressList_";

	const AGRESSIVE_HOVER = true;

	let dialog = document.getElementById("dialog_progress");
	dialog.innerHTML = "";
	dialog.style.display = "block";
	let list = document.getElementById("mainProgressList");
	list = document.createElement("ul");
	list.className = "progressList";

	for (let task of arg){
		let item = document.createElement("li");
		item.dataset.name = item.textContent = iconByStatus(task.status) + task.name;
		if (task.message){
			item.dataset.message = item.title = task.message;
		}
		item.id = ID_PREFIX + task.id;
		item.className = "progressItem";
		
		if (AGRESSIVE_HOVER){
			item.addEventListener("mouseenter", e => {
				if (item.dataset.message)
					item.textContent = item.dataset.message;
			});
			item.addEventListener("mouseleave", e => {
				item.textContent = item.dataset.name;
			});
		}

		let sublist = document.createElement("ul");
		for (let step of task.steps){
			let stepItem = document.createElement("li");
			stepItem.dataset.name = stepItem.textContent = iconByStatus(step.status) + step.name;
			if (step.message) {
				stepItem.dataset.message = stepItem.title = step.message;
			}
			stepItem.id = ID_PREFIX + step.id;
			stepItem.className = "progressItem";
			
			if (AGRESSIVE_HOVER){
				stepItem.addEventListener("mouseenter", e => {
					if (stepItem.dataset.message)
						stepItem.textContent = stepItem.dataset.message;
				});
				stepItem.addEventListener("mouseleave", e => {
					stepItem.textContent = stepItem.dataset.name;
				});
			}

			sublist.appendChild(stepItem);
		}
		list.appendChild(item)
		if (task.steps.length > 0)
			list.appendChild(sublist);
	}

	dialog.appendChild(list);
});

function forceLaumnch(starter){
	antiracer += 1;
	buttonsLocked = false;
	editButtonsLocked = false;
	switchButtonsLocked = false;
	starter();
	document.querySelectorAll(".slider").forEach((e)=>{e.style.backgroundColor="pink";});
}

let antiracer = 0;
function sendCommand(command, callback){
	let localAntiracer = antiracer;
	ipcRenderer.once("strelitziaResponse", (event, response) => {
		if (localAntiracer == antiracer){
			if (!processCommonResponses(response)){
				callback(response);
			}
		}
	});
	ipcRenderer.send("strelitziaCommand", command);
}