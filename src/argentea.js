/*
Argentea.js

Argentea is Strelitzia module responsible for providing interface to work with AppStore Connect using Chlorophytum while also providing detailed feedback

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢀⣤⠦⠦⠖⢤⡀⠀⠀⠀⠀⠀⢤⠤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠤⣄⠀⠀⠀⠀⠀⠀⡤⠲⠴⠤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⠀⠀⠀⠀⠙⠲⠦⠤⠤⠖⠁⠀⠀⠀⠉⢲⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⡞⠉⠀⠀⠀⠈⠳⠤⠤⠴⠖⠋⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣀⠤⢤⣤⠤⠖⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠲⠦⣤⡤⠴⡄⠀⠀⠀⠀
⠀⠀⠀⡢⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢷⠀⠀⠀
⠀⠀⠀⠛⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠧⣄⡀⠀⠀⠀⠀⣀⡴⢤⣀⠀⠀⠀⠀⠀⣀⡴⠃⣀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠀⠀⠀
⠀⠀⠀⠀⢹⠀⠀⠀⠀⠀⠀⠀⣀⠤⠖⠋⠉⠉⠀⠀⠁⠉⠙⠑⠲⠤⣀⠀⠀⠍⠉⢉⠞⠁⠀⣀⡤⠚⠁⠀⠀⠈⠓⢦⡠⠀⠈⠳⡄⠀⢀⠂⠀⣀⠤⠖⠚⠋⠉⠀⠀⠀⠈⠉⠛⠲⠤⣀⠀⠀⠀⠀⠀⠀⠀⡏⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⠀⠀⢀⡴⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠙⠢⣐⡴⠋⠀⣰⠖⠁⠀⠀⡈⠋⣿⣧⠀⠀⠈⠳⣄⡀⠈⢦⢀⠔⠋⠁⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠦⡀⠀⠀⠀⠀⡇⠀⠀⠀⠀
⠀⠀⠀⠀⡞⠀⠀⢀⡔⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⣠⠞⠁⠀⠀⠀⢀⠃⠀⣿⣿⡀⠀⠀⠀⠈⠑⢤⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠚⠢⡀⠀⠀⢹⡄⠀⠀⠀
⠀⠀⠀⠝⣄⡀⡠⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠞⠁⢀⡔⠂⢤⠢⢁⡠⠔⠛⢿⣿⣷⣤⣴⣢⡀⠈⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢄⠀⣠⠟⠀⠀⠀
⠀⠀⠀⠀⠀⠙⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠋⠀⠀⠰⣀⠀⠀⡠⠊⠀⠀⠀⠀⠙⢿⣿⣿⣿⠇⠀⠀⠘⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠋⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢦⠀⠀⠀⠇⢠⠊⠀⠀⠀⠀⠀⠀⠀⠀⠙⡽⣿⠄⠀⠀⡴⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢷⡀⠀⠘⢓⠐⠉⠁⠢⡀⢀⠔⠈⠉⠂⠚⠋⠀⢀⡜⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠙⢄⠀⠈⡄⠀⠀⠀⠈⠁⠀⠀⠀⢠⠃⠀⣤⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡏⠑⠶⣄⣀⠘⠷⣴⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣢⠞⠁⠀⣀⠶⠊⢱⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡸⠀⠀⠀⠀⢹⠀⠀⠀⠓⢄⡀⠀⠀⠀⠀⠀⣠⠞⠀⠀⠀⠏⠀⠀⠀⠀⢇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡇⠀⠀⠀⠀⡈⠀⠀⠀⠀⠀⠙⡦⣄⣀⠔⠋⠀⠀⠀⠀⠀⢾⠀⠀⠀⠀⠸⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠔⠀⠈⠙⠲⠤⣄⠀⠀⠀⠀⠀⠀⠀⠀⣀⡦⠔⠊⠁⠀⠢⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠘⠦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠲⠴⠤⠖⠓⠉⠀⠀⠀⠀⠀⠀⠀⠀⢀⡤⠃⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠋⠈⡶⡀⠘⠲⣄⠀⠀⠀⠀⢐⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⡂⠀⠀⠀⠀⣠⡖⢁⢠⢴⠁⠙⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⡜⠁⠀⠀⠃⠈⢢⠀⠀⠉⠦⢄⡀⠀⠀⠀⠀⠀⠀⠇⠀⠀⠀⠀⠀⢀⡠⠴⠋⠀⠀⡔⠁⠘⠀⠀⠈⢣⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⢠⠀⠀⡏⠀⠀⠀⣀⣀⢘⠑⠢⢤⣀⣠⠔⠢⢄⣀⡤⠔⠊⠃⣀⡀⠀⠀⠀⢸⠀⠀⡆⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⠀⠀⠌⠀⢠⠃⠀⠀⠀⡞⠀⠉⠓⠤⢤⣀⣀⠤⠦⣀⣀⡠⠤⠒⠉⠀⠱⡄⠀⠀⠈⡆⠀⠡⡀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⢀⠎⠀⠀⡸⠀⠀⠀⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠀⠀⠀⢣⠀⠀⠑⡀⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢇⠀⠀⠀⡟⠀⠀⠀⢸⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠚⠀⠀⠀⢸⡀⠀⠀⣸⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣆⠀⢸⠀⠀⠀⠀⠀⠘⢆⠀⠀⢠⠈⠉⡉⠙⡋⢉⠋⠉⡆⠀⠀⡰⠋⠁⠀⠀⠀⠐⡇⢀⢠⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⠺⣆⡏⠀⠀⠀⠀⠀⠀⠀⠱⣄⢸⠀⡎⠉⢉⡉⠉⢹⡄⣇⣠⠾⠀⠀⠀⠀⠀⠀⠀⢹⡰⠋⢤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⡜⠘⣄⡀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⡸⠀⠀⢸⡇⠀⠀⢧⠉⠃⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⣠⠃⢣⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡸⠁⠀⠈⠦⠤⠒⠲⡄⠀⠀⠀⠀⠀⠀⢰⠃⠀⠀⢸⠁⠀⠀⠘⡇⠀⠀⠀⠀⠀⠀⣀⠖⠒⠦⠴⠃⠀⠀⢏⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⡖⠉⠀⠀⠀⠀⢀⡀⠄⢂⠙⣆⠀⠀⠀⠀⠀⡞⠀⠀⠀⢸⠀⠀⠀⠀⢹⠀⠀⠀⠀⠀⢠⠫⡐⠠⢀⡀⠀⠀⠀⠀⠉⢲⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠋⠀⠀⠈⠭⠅⠐⠂⠉⠀⠀⠈⣇⠀⠀⠀⣰⢃⠀⠀⠀⠘⠂⠀⠀⠀⠸⢇⡀⠀⠀⢰⠁⠀⠀⠉⠐⠂⠨⠭⠅⠀⠀⠉⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⢀⠇⠈⢄⠀⠀⠀⠀⠀⠀⡀⠃⠸⣀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢱⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⢼⠀⠀⠀⠈⠀⠀⠀⠀⠏⠀⠀⠀⡇⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⣠⠴⠃⠀⠀⠙⠒⣤⣀⡀⠇⠀⠀⠸⢀⣀⠤⠖⠋⠀⠀⠘⠦⣄⠀⠀⠀⠀⠀⠀⡄⠀⠀⠀⡼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠷⡀⠀⠸⠀⠀⠀⠀⣀⠁⠳⡄⠀⠀⠀⠀⡸⠃⠀⠈⢹⠋⠋⡍⠁⠀⠘⢇⠀⠀⠀⠀⣀⠜⠙⣀⠀⠀⠀⠀⠀⠀⢀⡜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⣄⠐⠒⠂⠉⠁⡀⠜⢀⠖⠀⠀⠀⢴⠑⠀⠤⠤⢼⡀⠀⡧⠤⠤⠀⠊⢇⠀⠀⠀⢰⡀⠢⢀⡈⠉⠐⠒⠒⣠⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢉⡒⠖⠚⣉⡙⠒⠉⠁⠀⠀⠨⡃⠀⠀⠀⠀⢸⠀⠀⣇⠀⠀⠀⠀⠘⠄⠀⠀⠈⠉⠒⠋⣩⠓⠲⢖⡉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣕⠋⠉⢻⡀⠀⠀⠀⠀⠀⡏⠀⠒⠀⠀⣾⠀⠀⢽⠀⠀⠒⠂⢹⠁⠀⠀⠀⠀⠀⡼⠉⠙⢪⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢢⡀⠀⠹⣀⠀⠀⠀⠀⢼⠤⠀⣀⡀⢿⠀⠀⢸⢀⣀⠀⠤⡯⠀⠀⠀⠀⢠⠞⠀⢀⡔⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠹⢦⡀⠙⢧⠀⠀⠀⠈⡆⠀⠀⠀⢸⠀⠀⣸⠀⠀⠀⢰⠃⠀⠀⢀⣠⠋⢀⡴⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⡦⡈⠻⣀⠀⠀⢻⠁⠐⠒⢺⠀⠀⣿⠒⠒⠈⡿⠀⠀⢀⠜⢁⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⢝⣦⣀⠈⡇⠠⠤⢼⠀⠀⡿⠤⠄⢰⠃⢀⣶⡫⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠂⢸⣀⠀⢸⠀⠀⡇⠀⣀⡏⠘⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢣⠀⢸⡀⠀⡇⠀⡽⠀⠀⢌⣁⣀⣄⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣏⠹⡄⠸⡏⣱⠃⠀⡬⠻⢀⠰⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣆⡇⢰⢱⠇⠀⡘⣄⠨⣀⠠⣇⡽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠃⠘⠋⠀⠘⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
https://www.deviantart.com/argonaut11/art/Argentea-Darling-In-The-Franxx-Phone-wallpaper-744586505
*/

const chlorophytum = require("./chlorophytum.js");

let mainProgressList = [];
let onProgressChange;

const OPERATION_FAMILIES  = "getfamily";
const OPERATION_TEMPLATE  = ".template";
const OPERATION_CREATE    = ".create";
const OPERATION_OBTAINID  = ".obtainid";
const OPERATION_EQUALIZE  = ".equalize";
const OPERATION_PRICE     = ".price";
const OPERATION_TRIAL     = ".trial";
const OPERATION_REGFAMILY = ".register";
const OPERATION_DETAILS   = ".details";
const OPERATION_UPDATEIAP = ".update";
const OPERATION_SSOTOKEN  = ".ssotoken";
const OPERATION_UPLOAD    = ".upload";

const PROGRESS_INITIAL      = "initial";
const PROGRESS_INPROGRESS   = "inprogress";
const PROGRESS_DONE_OK      = "done_ok";
const PROGRESS_DONE_WARNING = "done_warning";
const PROGRESS_DONE_FAIL    = "done_fail";
const PROGRESS_BADAPOL      = "done_badapol";

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

const IAP_TYPE_NAMES_REVERSED = {
	"consumable"    : "c",
	"nonConsumable" : "nc",
	"recurring"     : "rs"
}

module.exports = {
	toInternalIAPType: (appStoreType)=>{
		return IAP_TYPE_NAMES_REVERSED[IAP_TYPE_NAMES[appStoreType]];
	},
	toAppStoreIAPType: (internalType)=>{
		return IAP_TYPE_NAMES[internalType];
	},
	planning: {
		resetProgressList: ()=>{
			mainProgressList = [];
		},
		setProgressCallback: (progressChange)=>{
			onProgressChange = progressChange;
		},
		planFamilyCheck: ()=>{
			mainProgressList.push({
				name: "Determine family",
				id: OPERATION_FAMILIES,
				steps: [],
				status: PROGRESS_INITIAL
			});
		},
		planFamilyCreation: (order)=>{
			let t = {
				name: "IAP " + order.bundle,
				id: order.bundle,
				steps: [
					{
						name: "Load family template",
						id: order.bundle + OPERATION_TEMPLATE,
						status: PROGRESS_INITIAL
					},
					{
						name: "Create family with IAP",
						id: order.bundle + OPERATION_CREATE,
						status: PROGRESS_INITIAL
					},
					{
						name: "Register new family",
						id: order.bundle + OPERATION_REGFAMILY,
						status: PROGRESS_INITIAL
					},
					{
						name: "Get fresh product id",
						id: order.bundle + OPERATION_OBTAINID,
						status: PROGRESS_INITIAL
					},
					{
						name: "Request IAP details for editing",
						id: order.bundle + OPERATION_DETAILS,
						status: PROGRESS_INITIAL
					},
					{
						name: "Update details with localized name and duration",
						id: order.bundle + OPERATION_UPDATEIAP,
						status: PROGRESS_INITIAL
					},
					{
						name: "Equalize prices",
						id: order.bundle + OPERATION_EQUALIZE,
						status: PROGRESS_INITIAL
					},
					{
						name: "Add price",
						id: order.bundle + OPERATION_PRICE,
						status: PROGRESS_INITIAL
					}
				],
				status: PROGRESS_INITIAL
			};

			if (order.trial != "off"){
				t.steps.push({
					name: "Add trial",
					id: order.bundle + OPERATION_TRIAL,
					status: PROGRESS_INITIAL
				});
			}

			if (order.screenshot) {
				t.steps.push({
					name: "Obtain SSO ITC token",
					id: order.bundle + OPERATION_SSOTOKEN,
					status: PROGRESS_INITIAL
				});
				t.steps.push({
					name: "Upload file",
					id: order.bundle + OPERATION_UPLOAD,
					status: PROGRESS_INITIAL
				});
			}

			mainProgressList.push(t);
		},
		planIAPCreation: (order)=>{
			let t = {
				name: "IAP " + order.bundle,
				id: order.bundle,
				steps: [
					{
						name: "Load IAP template",
						id: order.bundle + OPERATION_TEMPLATE,
						status: PROGRESS_INITIAL
					},
					{
						name: "Create IAP",
						id: order.bundle + OPERATION_CREATE,
						status: PROGRESS_INITIAL
					}
				],
				status: PROGRESS_INITIAL
			};
		
			if (order.type == "rs"){
				t.steps.push({
					name: "Get fresh product id",
					id: order.bundle + OPERATION_OBTAINID,
					status: PROGRESS_INITIAL
				});
				t.steps.push({
					name: "Equalize price",
					id: order.bundle + OPERATION_EQUALIZE,
					status: PROGRESS_INITIAL
				});
				t.steps.push({
					name: "Add price",
					id: order.bundle + OPERATION_PRICE,
					status: PROGRESS_INITIAL
				});
				if (order.trial != "off"){
					t.steps.push({
						name: "Add trial",
						id: order.bundle + OPERATION_TRIAL,
						status: PROGRESS_INITIAL
					});
				}
			}

			if (order.screenshot) {
				t.steps.push({
					name: "Obtain SSO ITC token",
					id: order.bundle + OPERATION_SSOTOKEN,
					status: PROGRESS_INITIAL
				});
				t.steps.push({
					name: "Upload file",
					id: order.bundle + OPERATION_UPLOAD,
					status: PROGRESS_INITIAL
				});
			}

			mainProgressList.push(t);
		},
		planEditing: (order)=>{
			let t = {
				name: "IAP " + order.bundle,
				id: order.bundle,
				steps: [
					{
						name: "Obtain IAP id",
						id: order.bundle + OPERATION_OBTAINID,
						status: PROGRESS_INITIAL
					},
					{
						name: "Load IAP data",
						id: order.bundle + OPERATION_DETAILS,
						status: PROGRESS_INITIAL
					}
				],
				status: PROGRESS_INITIAL
			};
		
			if (order.type == "rs"){
				if (order.price){
					t.steps.push({
						name: "Equalize price",
						id: order.bundle + OPERATION_EQUALIZE,
						status: PROGRESS_INITIAL
					});
					t.steps.push({
						name: "Set price",
						id: order.bundle + OPERATION_PRICE,
						status: PROGRESS_INITIAL
					});
					if (order.trial){
						t.steps.push({
							name: "Do nuffing while trying to add trial",
							id: order.bundle + OPERATION_TRIAL,
							status: PROGRESS_INITIAL
						});
					}
				}
			}

			if (order.screenshot) {
				t.steps.push({
					name: "Obtain SSO ITC token",
					id: order.bundle + OPERATION_SSOTOKEN,
					status: PROGRESS_INITIAL
				});
				t.steps.push({
					name: "Upload file",
					id: order.bundle + OPERATION_UPLOAD,
					status: PROGRESS_INITIAL
				});
			}

			t.steps.push({
				name: "Save changes",
				id: order.bundle + OPERATION_UPDATEIAP,
				status: PROGRESS_INITIAL
			});

			mainProgressList.push(t);
		},
		planSwitchVersion: (bundleName)=>{
			let t = {
				name: "IAP " + bundleName,
				id: bundleName,
				steps: [
					{
						name: "Obtain IAP id",
						id: bundleName + OPERATION_OBTAINID,
						status: PROGRESS_INITIAL
					},
					{
						name: "Load IAP data",
						id: bundleName + OPERATION_DETAILS,
						status: PROGRESS_INITIAL
					},
					{
						name: "Save changes",
						id: bundleName + OPERATION_UPDATEIAP,
						status: PROGRESS_INITIAL
					}
				],
				status: PROGRESS_INITIAL
			};

			mainProgressList.push(t);
		},
		planReviewScreenshotUpload: (filename)=>{
			let t = {
				name: filename,
				id: filename,
				steps: [
					{
						name: "Obtain SSO ITC token",
						id: filename + OPERATION_SSOTOKEN,
						status: PROGRESS_INITIAL
					},
					{
						name: "Upload file",
						id: filename + OPERATION_UPLOAD,
						status: PROGRESS_INITIAL
					}
					
				],
				status: PROGRESS_INITIAL
			};
			mainProgressList.push(t);
		},
		beginIAP: (bundleName)=>{
			progress(bundleName, null, PROGRESS_INPROGRESS);
		},
		endIAP: (bundleName, success, message)=>{
			progress(bundleName, null, success ? PROGRESS_DONE_OK : PROGRESS_DONE_FAIL, message);
		}
	},
	/* Operations provide feedback about their progress */
	operations: {
		equalizeByUSD: async (bundleName, appId, productId, tier)=>{
			progress(bundleName, OPERATION_EQUALIZE, PROGRESS_INPROGRESS);
			let response = await chlorophytum.sendEqualizeByUSDRequest(appId, productId, tier);
			if (response.result && response.result.data){
				progress(bundleName, OPERATION_EQUALIZE, PROGRESS_DONE_OK);
				return response.result.data;
			} else {
				progress(bundleName, OPERATION_EQUALIZE, PROGRESS_BADAPOL, response.errors);
				return null;
			}
		},
		createRSPricing: async (bundleName, equalized, countryCodes, appId, productId)=>{
			let pricing = buildSubscriptionPricing(equalized, countryCodes);
			progress(bundleName, OPERATION_PRICE, PROGRESS_INPROGRESS);
			let response = await chlorophytum.sendRSPriceCreation(pricing, appId, productId);
			if (response.result == "OK"){
				progress(bundleName, OPERATION_PRICE, PROGRESS_DONE_OK);
				return true;
			} else {
				progress(bundleName, OPERATION_PRICE, PROGRESS_DONE_FAIL, response.errors);
				return false;
			}
		},
		createTrial: async (bundleName, trialDuration, appId, productId, countryCodes)=>{
			progress(bundleName, OPERATION_TRIAL, PROGRESS_INPROGRESS);
			let trialRequest = buildTrialRequest(trialDuration, appId, productId, countryCodes);
			let response = await chlorophytum.sendTrialCreation(trialRequest);
			if (response.result == "OK") {
				progress(bundleName, OPERATION_TRIAL, PROGRESS_DONE_OK);
				return true;
			} else {
				progress(bundleName, OPERATION_TRIAL, PROGRESS_DONE_FAIL, response.errors);
				return false;
			}
		},
		selectFamily: async (bundleName, appId, repeated, defaultFamilyName)=>{
			let operationId = repeated ? OPERATION_REGFAMILY : OPERATION_FAMILIES;
			progress(bundleName, operationId, PROGRESS_INPROGRESS);
			let response = await chlorophytum.sendFamiliesRequest(appId);
			if (response.result && response.result.data){
				progress(bundleName, operationId, PROGRESS_DONE_OK);
				let selectedFamily;
				try {
					if (response.result.data.length >= 1){
						selectedFamily = {
							name: response.result.data[0].name.value,
							id:   response.result.data[0].id
						};
						let message = "Detected existing family. Using \"" + selectedFamily.name + "\"";
						progress(bundleName, operationId, PROGRESS_DONE_OK, message);
					} else {
						selectedFamily = {
							name: defaultFamilyName,
							id:   null
						};
						let message = "No families detected, will create a new one with name \"" + defaultFamilyName + "\"";
						progress(bundleName, operationId, PROGRESS_DONE_WARNING, message);
					}
					return selectedFamily;
				} catch(e){
					let message = "Failed to read existing families";
					progress(bundleName, operationId, PROGRESS_DONE_FAIL, message);
					return null;
				}
			} else {
				progress(bundleName, operationId, PROGRESS_DONE_FAIL, response.errors);
				return null;
			}
		},
		requestFamilyTemplate: async (bundleName, appId)=>{
			progress(bundleName, OPERATION_TEMPLATE, PROGRESS_INPROGRESS);
			let response = await chlorophytum.sendFamilyTemplateRequest(appId);
			if (response.result && response.result.data){
				progress(bundleName, OPERATION_TEMPLATE, PROGRESS_DONE_OK);
				return response.result.data;
			} else {
				progress(bundleName, OPERATION_TEMPLATE, PROGRESS_DONE_FAIL, response.errors);
				return null;
			}
		},
		requestIAPTemplate: async (bundleName, appId)=>{
			progress(bundleName, OPERATION_TEMPLATE, PROGRESS_INPROGRESS);
			let response = await chlorophytum.sendTemplateRequest(appId, IAP_TYPE_NAMES[order.type]);
			if (response.result && response.result.data){
				progress(bundleName, OPERATION_TEMPLATE, PROGRESS_DONE_OK);
				return response.result.data;
			} else {
				progress(bundleName, OPERATION_TEMPLATE, PROGRESS_DONE_FAIL, response.errors);
				return null;
			}
		},
		createFamily: async (bundleName, filledTemplate, appId)=>{
			progress(bundleName, OPERATION_CREATE, PROGRESS_INPROGRESS);
			let response = await chlorophytum.sendFamilyCreation(filledTemplate, appId);

			if (response.result == "OK"){
				progress(bundleName, OPERATION_CREATE, PROGRESS_DONE_OK);
				return true;
			} else {
				progress(bundleName, OPERATION_CREATE, PROGRESS_DONE_FAIL, response.errors);
				return false;
			}
		},
		obtainProductId: async (bundleName, appId, tries = 7)=>{
			let message;
			progress(bundleName, OPERATION_OBTAINID, PROGRESS_INPROGRESS);
			while (tries > 0){
				tries -= 1;
				let response = await chlorophytum.sendIAPsRequest(appId);
		
				if (response.result && response.result.data){
					for (let iap of response.result.data)
						if (iap.vendorId == bundleName){
							progress(bundleName, OPERATION_OBTAINID, PROGRESS_DONE_OK);
							return iap.adamId;
						}

					message = "Retrying to obtain id of fresh product. Tries left: " + tries;
					progress(bundleName, OPERATION_OBTAINID, PROGRESS_BADAPOL, message);
				} else {
					progress(bundleName, OPERATION_OBTAINID, PROGRESS_BADAPOL, response.errors);
					continue;
				}
			}
			message = "Failed to acquire id of freshly created purchase";
			progress(bundleName, OPERATION_OBTAINID, PROGRESS_DONE_FAIL, message);
			return null;
		},
		requestIAPDetails: async (bundleName, appId, productId)=>{
			progress(bundleName, OPERATION_DETAILS, PROGRESS_INPROGRESS);
			let response = await chlorophytum.sendIAPDetailsRequest(appId, productId);
			if (response.result && response.result.data){
				progress(bundleName, OPERATION_DETAILS, PROGRESS_DONE_OK);
				return response.result.data;
			} else {
				progress(bundleName, OPERATION_DETAILS, PROGRESS_DONE_FAIL, response.errors);
				return null;
			}
		},
		createIAP: async (bundleName, filledTemplate, appId, overwriteAllowed)=>{
			progress(bundleName, OPERATION_CREATE, PROGRESS_INPROGRESS);
			let response = await chlorophytum.sendIAPCreation(filledTemplate, appId);

			if (response.result == "OK"){
				progress(bundleName, OPERATION_CREATE, PROGRESS_DONE_OK);
				return true;
			} else {
				let alreadyExists = response.errors.includes("The product ID you entered has already been used");
				if (overwriteAllowed && alreadyExists){
					progress(bundleName, OPERATION_CREATE, PROGRESS_DONE_WARNING, response.errors);
					return true;
				} else {
					progress(bundleName, OPERATION_CREATE, PROGRESS_DONE_FAIL, response.errors);
					return false;
				}
			}
		},
		updateIAPDetails: async (bundleName, filledDetails, appId, productId)=>{
			progress(bundleName, OPERATION_UPDATEIAP, PROGRESS_INPROGRESS);
			response = await chlorophytum.sendIAPDetailsRefresh(filledDetails, appId, productId);
			if (response.result == "OK") {
				progress(bundleName, OPERATION_UPDATEIAP, PROGRESS_DONE_OK);
				return true;
			} else {
				progress(bundleName, OPERATION_UPDATEIAP, PROGRESS_DONE_FAIL, response.errors);
				return false;
			}
		},
		uploadReviewScreenshot: async (bundleName, appId, productId, file)=>{
			progress(bundleName, OPERATION_SSOTOKEN, PROGRESS_INPROGRESS);
			let ssoResponse = await chlorophytum.sendRefRequest();
			let ssoToken;
			if (ssoResponse.result && ssoResponse.result.data){
				progress(bundleName, OPERATION_SSOTOKEN, PROGRESS_DONE_OK);
				ssoToken = ssoResponse.result.data.ssoTokenForImage;
			} else {
				progress(bundleName, OPERATION_SSOTOKEN, PROGRESS_DONE_FAIL, response.errors);
				return null
			}

			progress(bundleName, OPERATION_UPLOAD, PROGRESS_INPROGRESS);
			response = await chlorophytum.uploadReviewScreenshot(appId, productId, file, ssoToken);
			if (response.result) {
				progress(bundleName, OPERATION_UPLOAD, PROGRESS_DONE_OK);
				return response.result;
			} else {
				progress(bundleName, OPERATION_UPLOAD, PROGRESS_DONE_FAIL, response.errors);
				return null;
			}
		}
	},
	requestServiceKey: async ()=>{
		return (await chlorophytum.sendServiceKeyRequest()).result;
	},
	checkSession: async ()=>{
		let response = await chlorophytum.sendToOlympus();
		return response.result != "AUTH";
	},
	acquireContentProviderId: async ()=>{
		let response = await chlorophytum.sendUserDetails();
		if (response.result && response.result.data){
			return response.result.data.contentProviderId;
		} else {
			return null
		}
	},
	listTeams: async ()=>{
		//response.result.data.contentProviderId
		let response = await chlorophytum.sendUserDetails();
		if (response.result && response.result.data){
			let teamOptions = [];
			for (let a of response.result.data.associatedAccounts){
				let team = {
					name: a.contentProvider.name,
					id: a.contentProvider.contentProviderId
				};
				teamOptions.push(team);
			}
			return teamOptions;
		} else {
			return null;
		}
	},
	login: async (login, password)=>{
		return (await chlorophytum.sendLogin(login, password)).result;
	},
	sendCode: async (code)=>{
		let response = await chlorophytum.sendCode(code);
		return response.result == "OK";//TODO: Investigate response for wrong code
	},
	listApps: async ()=>{
		let response = await chlorophytum.sendAppsRequest();

		if (response.result && response.result.data){
			let apps = [];
			for (let app of response.result.data.summaries){
				apps.push({
					id: app.adamId,
					name: app.name,
					bundle: app.bundleId,
					icon: app.iconUrl
				});
			}
			return apps;
		} else {
			return null;
		}
	},

	requestRSPricing: async (appId, productId)=>{
		let response = await chlorophytum.sendRSPricingRequest(appId, productId);
		if (response.result && response.result.data){
			return response.result.data;
		} else {
			return null;
		}
	},
	listIAPs: async (appId)=>{
		let response = await chlorophytum.sendIAPsRequest(appId);

		if (response.result && response.result.data){
			return response.result.data;
		} else {
			return null;
		}
	},
	downloadIAP: async (appId, productId)=>{
		let response = await requestIAP(appId, productId);
		if (response){
			let pricing;
			if (response.addOnType == IAP_TYPE_RS){
				pricing = await module.exports.requestRSPricing(appId, productId);
			}
			if (pricing)
				response.appliedPricingData = pricing;
			return response;
		} else {
			return null;
		}
	},
	downloadRSMatrix: async (appId)=>{
		let matrix = [];
		let rawRSMatrix = (await chlorophytum.sendRSMatrixRequest(appId)).result;
		if (rawRSMatrix && rawRSMatrix.data && rawRSMatrix.data.pricingTiers){
			for (let tier of rawRSMatrix.data.pricingTiers){
				for (let pricingInfo of tier.pricingInfo){
					if (pricingInfo.countryCode == "US"){
						let t = {
							tier: tier.tierStem,
							price: ""+pricingInfo.retailPrice
						}
						matrix.push(t);
						break;
					}
				}
			}
			return matrix;
		}
		return null;
	},
	downloadCMatrix: async (appId)=>{
		let matrix = [];
		let rawCMatrix = (await chlorophytum.sendCMatrixRequest(appId)).result;
		if (rawCMatrix && rawCMatrix.data && rawCMatrix.data.pricingTiers){
			for (let tier of rawCMatrix.data.pricingTiers){
				for (let pricingInfo of tier.pricingInfo){
					if (pricingInfo.countryCode == "US"){
						let t = {
							tier: tier.tierStem,
							price: ""+pricingInfo.retailPrice
						}
						matrix.push(t);
						break;
					}
				}
			}
			return matrix;
		}
		return null;
	},
	downloadCountryCodes: async (appId)=>{
		let ccResponse = (await chlorophytum.sendCountriesRequest()).result;
		if (ccResponse && ccResponse.data){
			let codes = [];

			for (let country of ccResponse.data)
				codes.push(country.code);

			return codes
		}
		return null;
	}
};

function progress(bundleName, operationId, status, message = null){
	if (message == chlorophytum.BAD_APOL) status = PROGRESS_BADAPOL;

	let target = null;
	let targetId = (bundleName ? bundleName : "") + (operationId ? operationId : "");

	for (let item of mainProgressList){
		if (item.id == targetId){
			target = item;
			break;
		}
		for (let step of item.steps){
			if (step.id == targetId){
				target = step;
				break;
			}
		}
	}

	if (!target){
		console.log("Changing progress on unplanned step");
		return;
	}

	target.status = status;
	target.message = message;

	onProgressChange(mainProgressList);
}

async function requestIAP(appId, productId){
	let response = await chlorophytum.sendIAPDetailsRequest(appId, productId);
	if (response.result && response.result.data){
		return response.result.data;
	} else {;
		return null;
	}
}

function buildSubscriptionPricing(equalizedTierMap, countryCodes){
	let data = {
		subscriptions: []
	}

	for (let code of countryCodes){
		if (!equalizedTierMap[code]){
			console.log("UNKNOWN COUNTRY CODE");
			return null;
		}
		let tier = equalizedTierMap[code].tierStem;

		let entry = {
			errorKeys: null,
			isEditable: true,
			isRequired: false,
			value: {
				country: code,
				grandfathered: {
					value: "FUTURE_NONE", 
					isEditable: false, 
					isRequired: false, 
					errorKeys: null
				},
				priceTierEffectiveDate: null,
				priceTierEndDate: null,
				tierStem: tier
			}
		}
		data.subscriptions.push(entry);
	}
	return data;
}

function buildTrialRequest(trialDuration, appId, productId, countryCodes){
	function pad(num, size) {
		let s = "00" + num;
		return s.substr(s.length - size);
	}
	let d = new Date();
	
	let currentDate = "" + d.getFullYear() + "-" + pad((d.getMonth() + 1), 2) + "-" + pad(d.getDate(), 2);
	let data = {
		batch: [{
			method: "POST",
			path: "/apps/" + appId + "/iaps/" + productId + "/pricing/intro-offers",
			value: {
				introOffers: []
			}
		}]
	}
	for (let code of countryCodes){
		let entry = {
			errorKeys: null,
			isEditable: true,
			isRequired: true,
			value: {
				country: code,
				durationType: trialDuration,
				numOfPeriods: 1,
				offerModeType: "FreeTrial",
				startDate: currentDate,
				endDate: null,
				tierStem: null	
			}
		}
		data.batch[0].value.introOffers.push(entry);
	}
	return data;
}