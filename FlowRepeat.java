
public class FlowRepeat {
	public static void main(String[] args) {
	int numPeople;
	int numAgencies;
	int numPreferences;
	
	int inAgency;
	int outAgency;
	
	//initialize number of things to remove error
	numPeople = 40;
	numAgencies = 30;
	numPreferences = 20;
	
	boolean[][] peoplePreferences = new boolean[numPeople][numPreferences];
	boolean[][] agencyPreferences = new boolean[numAgencies][numPreferences];
	int[][] peopleWithAgencyMatches = new int[numPeople][numAgencies];
	double[][] distance = new double[numPeople][numAgencies];

	//where people came from and where they are coming out of
	int[] peopleInAgency = new int[numPeople];
	int[] peopleOutAgency = new int[numPeople];
	
	//IMPORTANT - flow in and flow out of agencies
	int[] peopleIn = new int[numAgencies];
	int[] peopleOut = new int[numAgencies];
	
	//initialize peopleIn to remove error
	for(int i = 0; i < numAgencies; i++) {
		peopleIn[i] = 0;
	}
	//initialize peopleOut to remove error
	for(int i = 0; i < numAgencies; i++) {
		peopleOut[i] = 0;
	}
	
	//initialize peoplePreferences to remove error
	for(int i = 0; i < numPeople; i++) {
		for(int j = 0; j < numPreferences; j++) {
			if(Math.random() <= 0.25) {
				peoplePreferences[i][j] = false;
			}
			else {
				peoplePreferences[i][j] = true;
			}
		}
	}
	//initialize agencyMatches to remove error
	for(int i = 0; i < numAgencies; i++) {
		for(int j = 0; j < numPreferences; j++) {
			if(Math.random() <= 0.1) {
				agencyPreferences[i][j] = false;
			}
			else {
				agencyPreferences[i][j] = true;
			}
		}
	}
	//initialize peopleWithAgencyMatches to remove error
	for(int i = 0; i < numPeople; i++) {
		for(int j = 0; j < numAgencies; j++) {
			peopleWithAgencyMatches[i][j] = 0;
		}
	}
	//initialize distance to remove error
	for(int i = 0; i < numPeople; i++) {
		for(int j = 0; j < numAgencies; j++) {
			distance[i][j] = Math.random() * 25;
		}
	}
	//initialize peopleInAgency and peopleOutAgency to remove error
	for(int i = 0; i < numPeople; i++) {
		peopleInAgency[i] = (int) (1 + Math.random() * numAgencies);
		peopleOutAgency[i] = peopleInAgency[i]; //by default, in case no agencies nearby
	}
	
	//GET FREQUENCY OF MATCHES
	for(int i = 0; i < peoplePreferences.length; i++) {
		for(int j = 0; j < agencyPreferences.length; j++) {
			for(int k = 0; k < numPreferences; k++) {
				if (peoplePreferences[i][k] == true && agencyPreferences[j][k] == true) {
					peopleWithAgencyMatches[i][j]++;
				}
			}
		}
	}
	
	//REMOVE ANY AGENCIES THAT ARE MORE THAN 12 MILES AWAY
	for(int i = 0; i < numPeople; i++) {
		for(int j = 0; j < numAgencies; j++) {
			if (distance[i][j] > 12) {
				peopleWithAgencyMatches[i][j] = 0;
			}
		}
	}
	
	//FIND AGENCY TO RELOCATE TO
	for(int i = 0; i < numPeople; i++) {
		int k = 0;
		while(peopleWithAgencyMatches[i][k] == 0) {
			k++;
		}
		peopleOutAgency[i] = k;
		for(int j = 0; j < numAgencies; j++) {
			if(peopleWithAgencyMatches[i][j] > k) {
				peopleOutAgency[i] = j;
			}
		}
		peopleIn[peopleOutAgency[i]]++;
		peopleOut[peopleInAgency[i]]++;
	}
	

	
	//print to see if simulation works
	for(int i = 0; i < numAgencies; i++) {
		System.out.println("Agency " + i + ": " + peopleIn[i] + " in");
		System.out.println("Agency " + i + ": " + peopleOut[i] + " out");
	}
	
	}
}
