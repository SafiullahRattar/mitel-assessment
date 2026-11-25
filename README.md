This is my submission for mitel's coding assessment

Problems: 
1) The provided db.json was missing a comma on line 84, I edited that directly
2) 2 users had the same ids. I refactored my code to track by user object rather than by user id, instead of editing ids in the db manually (jane smith and krystal johnson)
3) For user casey daniels, the plan type is basic, but plan description is the lite package
4) The features of conference calling, call waiting, and voicemail don't map to plans, users with the same plans have different features, so I derived features from the user rather than from the plan

To fix issues 2 and 3, I added a warnings list to users with a review tab,  so that an admin can directly notice these problems

Run with ng serve

Thanks,
Safi


