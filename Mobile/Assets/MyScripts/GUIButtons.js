#pragma strict
import System;

private var date : DateTime;

private var playerCamera : GameObject;
var playerDataStyle : GUIStyle;

private var player : GameObject;
private var playerStatescript : PlayerState;
private var screenWidth : float;
private var screenHeight : float;
private var playerInitialLocation : Vector3;
private var cameraInitialLocation : Vector3;
private var cameraInitialRotation : Quaternion;
private var playerCameraScript : PlayerCameraMovement;
private var guiLabelsScript : GUILabels;
public var showGameStartMessage : boolean;
private var screenGameOverPauseScript : screenGameOverPause;

private var _nativeWidth : float = 1280;
private var _nativeHeight : float = 800;

var timer : float;

function Start()
{	
	showGameStartMessage = true;	
	player = GameObject.Find("Player");
	playerStatescript = player.GetComponent("PlayerState");	
	playerCamera = GameObject.Find("PlayerCamera");
	playerCameraScript = playerCamera.GetComponent("PlayerCameraMovement");
	screenGameOverPauseScript = player.GetComponent("screenGameOverPause");
	guiLabelsScript = player.GetComponent("GUILabels");
	screenWidth = Screen.currentResolution.width;
	screenHeight = Screen.currentResolution.height;
	playerInitialLocation = player.transform.position;
	cameraInitialLocation = playerCamera.transform.position;
	cameraInitialRotation = playerCamera.transform.rotation;
	
	//Debug.Log("Screen height: " + screenHeight + ", Screen width: " + screenWidth);
}

function Update()
{
	//Add the time every Frame if race isnt finished
	if(screenGameOverPauseScript.levelCompleted == false)
	{
		timer += Time.deltaTime;
	}
}

function OnGUI ()
{
	//set up scaling
	var rx : float = Screen.width / _nativeWidth ;
	var ry : float = Screen.height / _nativeHeight ;
	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, new Vector3 (rx, ry, 1));

	GUI.TextArea(Rect(40, 40, 260, 150), "Coins : " + playerStatescript.playerCoinScore + " / "+ screenGameOverPauseScript.coinChallenge, playerDataStyle);
	
    date = new System.DateTime(timer * System.TimeSpan.TicksPerSecond);
    
    
	GUI.TextArea(Rect(40, 40 + 40, 300, 150), "Time : " + (screenGameOverPauseScript.timeChallenge - Math.Floor(timer)), playerDataStyle);
		
	if(showGameStartMessage == true && PlayerPrefs.GetInt("isRetry") == 0)
	{
		if (GUI.Button(Rect(450, 300, 300, 200), "<size=40><b>START GAME</b></size>"))
		{
			//print ("Start button clicked.");
			showGameStartMessage = false;
			playerStatescript.myState = State.inGame;
			playerCameraScript.rotationDirection = 1;
			
			Time.timeScale = 1.0;		
		}
		else
		{
			timer = 0.0;
			Time.timeScale = 0.0;
		}
	}
}
