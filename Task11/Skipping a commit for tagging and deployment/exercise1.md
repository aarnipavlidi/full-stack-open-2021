## Exercise 11.1 warming up

Let's say we need make new project, which is using Python language only (I have not used the language personally, I only know it can be used
for example data analysis) and project has total of 3 different team members, where me is 3th member and leader of the project.

What should I take into consideration, before we start journey of this project? I would imagine first that we would have to choose system
and we take GitHub Actions, because our team is small and this way I can possible monitor others doings so I have have better understanding
that where we are going.

Next step would setup testing environment and I would it do it so that when "code" is being tested, everybody would test the code against
same "variable" like for example external server, where every time we do test the "starting point" is the same. When there is less variables
affecting the outcome of test and if test is bringing any problems (bugs etc.) it would be most likely easier to find the problem and fix it,
before the problem causes too many issues and it would be near impossible find and fix. Our project is about data analysis, so we would need
to have some kind external database, where all of us (3 members) have access of all times.
