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

module.exports = {
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
					name: "Equalize prices",
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
			let result = await chlorophytum.sendEqualizeByUSDRequest(appId, productId, tier);
			if (result && result.data){
				progress(bundleName, OPERATION_EQUALIZE, PROGRESS_DONE_OK);
				return result.data;
			} else {
				progress(bundleName, OPERATION_EQUALIZE, PROGRESS_BAD_APOL, chlorophytum.getLastErrors());
				return null;
			}
		},
		createRSPricing: async (bundleName, equalized, countryCodes, appId, productId)=>{
			let pricing = buildSubscriptionPricing(equalized, countryCodes);
			progress(bundleName, OPERATION_PRICE, PROGRESS_INPROGRESS);
			let pricingResponse = await chlorophytum.sendRSPriceCreation(pricing, appId, productId);
			if (pricingResponse == "OK"){
				progress(bundleName, OPERATION_PRICE, PROGRESS_DONE_OK);
				return true;
			} else {
				progress(bundleName, OPERATION_PRICE, PROGRESS_DONE_FAIL, chlorophytum.getLastErrors());
				return false;
			}
		},
		createTrial: async (bundleName, trialDuration, appId, productId, countryCodes)=>{
			progress(bundleName, OPERATION_TRIAL, PROGRESS_INPROGRESS);
			let trialRequest = buildTrialRequest(trialDuration, appId, productId, countryCodes);
			let trialResponse = await chlorophytum.sendTrialCreation(trialRequest);
			if (trialResponse == "OK") {
				progress(bundleName, OPERATION_TRIAL, PROGRESS_DONE_OK);
			} else {
				progress(bundleName, OPERATION_TRIAL, PROGRESS_DONE_FAIL, chlorophytum.getLastErrors());
			}
		},
		selectFamily: async (appId, repeated, defaultFamilyName)=>{
			let operationId = repeated ? OPERATION_REGFAMILY : OPERATION_FAMILIES;
			progress(null, operationId, PROGRESS_INPROGRESS);
			let familiesResponse = await chlorophytum.sendFamiliesRequest(appId);
			if (familiesResponse && familiesResponse.data){
				progress(null, operationId, PROGRESS_DONE_OK);
				let selectedFamily;
				try {
					if (familiesResponse.data.length >= 1){
						selectedFamily = {
							name: familiesResponse.data[0].name.value,
							id:   familiesResponse.data[0].id
						};
						let message = "Detected existing family. Using \"" + selectedFamily.name + "\"";
						progress(null, operationId, PROGRESS_DONE_OK, message);
					} else {
						selectedFamily = {
							name: defaultFamilyName,
							id:   null
						};
						let message = "No families detected, will create a new one with name \"" + defaultFamilyName + "\"";
						progress(null, operationId, PROGRESS_DONE_WARNING, message);
					}
					return selectedFamily;
				} catch(e){
					let message = "Failed to read existing families";
					progress(null, operationId, PROGRESS_DONE_FAIL, message);
					return null;
				}
			} else {
				progress(null, operationId, PROGRESS_DONE_FAIL);
				return null;
			}
		},
		requestFamilyTemplate: async (bundleName, appId)=>{
			progress(bundleName, OPERATION_TEMPLATE, PROGRESS_INPROGRESS);
			let templateResponse = await chlorophytum.sendFamilyTemplateRequest(appId);
			if (templateResponse && templateResponse.data){
				progress(bundleName, OPERATION_TEMPLATE, PROGRESS_DONE_OK);
				return templateResponse.data;
			} else {
				progress(bundleName, OPERATION_TEMPLATE, PROGRESS_DONE_FAIL);
				return null;
			}
		},
		requestIAPTemplate: async (bundleName, appId)=>{
			progress(bundleName, OPERATION_TEMPLATE, PROGRESS_INPROGRESS);
			let templateResponse = await chlorophytum.sendTemplateRequest(appId, IAP_TYPE_NAMES[order.type]);
			if (templateResponse && templateResponse.data){
				progress(bundleName, OPERATION_TEMPLATE, PROGRESS_DONE_OK);
				return templateResponse.data;
			} else {
				progress(bundleName, OPERATION_TEMPLATE, PROGRESS_DONE_FAIL, chlorophytum.getLastErrors());
				return null;
			}
		},
		createFamily: async (bundleName, filledTemplate, appId)=>{
			progress(bundleName, OPERATION_CREATE, PROGRESS_INPROGRESS);
			let createResponse = await chlorophytum.sendFamilyCreation(filledTemplate, appId);

			if (createResponse == "OK"){
				progress(bundleName, OPERATION_CREATE, PROGRESS_DONE_OK);
				return true;
			} else {
				progress(bundleName, OPERATION_CREATE, PROGRESS_DONE_FAIL, chlorophytum.getLastErrors());
				return false;
			}
		},
		obtainProductId: async (bundleName, appId, tries = 7)=>{
			let message;
			progress(bundleName, OPERATION_OBTAINID, PROGRESS_INPROGRESS);
			while (tries > 0){
				tries -= 1;
				let iapsResponse = await chlorophytum.sendIAPsRequest(appId);
		
				if (iapsResponse && iapsResponse.data){
					for (let iap of iapsResponse.data)
						if (iap.vendorId == bundleName){
							progress(bundleName, OPERATION_OBTAINID, PROGRESS_DONE_OK);
							return iap.adamId;
						}

					message = "Retrying to obtain id of fresh product. Tries left: " + tries;
					progress(bundleName, OPERATION_OBTAINID, PROGRESS_BADAPOL, message);
				} else {
					progress(bundleName, OPERATION_OBTAINID, PROGRESS_BADAPOL, chlorophytum.getLastErrors());
					continue;
				}
			}
			message = "Failed to acquire id of freshly created purchase";
			progress(bundleName, OPERATION_OBTAINID, PROGRESS_DONE_FAIL, message);
			return null;
		},
		requestIAPDetails: async (bundleName, appId, productId)=>{
			progress(bundleName, OPERATION_DETAILS, PROGRESS_INPROGRESS);
			let detailsResponse = await requestIAP(appId, productId);
			if (detailsResponse){
				progress(bundleName, OPERATION_DETAILS, PROGRESS_DONE_OK);
				return detailsResponse;
			} else {
				progress(bundleName, OPERATION_DETAILS, PROGRESS_DONE_FAIL, chlorophytum.getLastErrors());
				return null;
			}
		},
		createIAP: async (bundleName, filledTemplate, appId, overwriteAllowed)=>{
			progress(bundleName, OPERATION_CREATE, PROGRESS_INPROGRESS);
			let createResponse = await chlorophytum.sendIAPCreation(filledTemplate, appId);

			if (createResponse == "OK"){
				progress(bundleName, OPERATION_CREATE, PROGRESS_DONE_OK);
				return true;
			} else {
				if (overwriteAllowed && chlorophytum.isLastErrorIsAlreadyExistingError()){
					progress(bundleName, OPERATION_CREATE, PROGRESS_DONE_WARNING, chlorophytum.getLastErrors());
					return true;
				} else {
					progress(bundleName, OPERATION_CREATE, PROGRESS_DONE_FAIL, chlorophytum.getLastErrors());
					return false;
				}
			}
		},
		updateIAPDetails: async (bundleName, filledDetails, appId, productId)=>{
			progress(bundleName, OPERATION_UPDATEIAP, PROGRESS_INPROGRESS);
			baseResponse = await chlorophytum.sendIAPDetailsRefresh(filledDetails, appId, productId);
			if (baseResponse == "OK") {
				progress(bundleName, OPERATION_UPDATEIAP, PROGRESS_DONE_OK);
				return true;
			} else {
				progress(bundleName, OPERATION_UPDATEIAP, PROGRESS_DONE_FAIL, chlorophytum.getLastErrors());
				return false;
			}
		}
	},
	requestServiceKey: async()=>{
		return await chlorophytum.sendServiceKeyRequest();
	},
	checkSession: async()=>{
		let olympusResponse = await chlorophytum.sendToOlympus();
		return olympusResponse != "AUTH";
	},
	listTeams: async ()=>{
		let details = await chlorophytum.sendUserDetails();
		if (details && details.data){
			let teamOptions = [];
			for (let a of details.data.associatedAccounts){
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
		return await chlorophytum.sendLogin(login, password);
	},
	sendCode: async (code)=>{
		let codeResponse = await chlorophytum.sendCode(code);
		return codeResponse == "OK";
		if (codeResponse == "OK"){
			return true;
		} else { //TODO: Investigate response for wrong code
			return false;
		}
	},
	listApps: async ()=>{
		let response = await chlorophytum.sendAppsRequest();

		if (response && response.data){
			let apps = [];
			for (let app of response.data.summaries){
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
		let pricing = await chlorophytum.sendRSPricingRequest(appId, productId);
		if (pricing && pricing.data){
			return pricing.data;
		} else {
			return null;
		}
	},
	listIAPs: async (appId)=>{
		let iapsResponse = await chlorophytum.sendIAPsRequest(appId);

		if (iapsResponse && iapsResponse.data){
			return iapsResponse.data;
		} else {
			return null;
		}
	},
	downloadIAP: async (appId, productId)=>{
		let detailsResponse = await requestIAP(appId, productId);
		if (detailsResponse){
			let pricing;
			if (detailsResponse.addOnType == IAP_TYPE_RS){
				pricing = await module.exports.requestRSPricing(appId, productId);
			}
			if (pricing)
				detailsResponse.appliedPricingData = pricing;
			return detailsResponse;
		} else {
			return null;
		}
	},

	downloadRSMatrix: async (appId)=>{
		let matrix = [];
		let rawRSMatrix = await chlorophytum.sendRSMatrixRequest(appId);
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
		let rawCMatrix = await chlorophytum.sendCMatrixRequest(appId);
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
		let ccResponse = await chlorophytum.sendCountriesRequest();
		if (ccResponse && ccResponse.data){
			let codes = [];

			for (let country of ccResponse.data)
				codes.push(country.code);

			return codes
		}
		return null;
	}
};

async function requestIAP(appId, productId){
	let detailsResponse = await chlorophytum.sendIAPDetailsRequest(appId, productId);
	if (detailsResponse && detailsResponse.data){
		return detailsResponse.data;
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