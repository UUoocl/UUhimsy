-- This Source Code Form is subject to the terms of the
-- Mozilla Public License, v. 2.0. If a copy of the MPL
-- was not distributed with this file, You can obtain one
-- at https://mozilla.org/MPL/2.0/.
--
-- Modified showhtk.lua by poypoyan. https://github.com/poypoyan/showhtk
-- 
--https://github.com/obsproject/obs-studio/blob/master/libobs/obs-hotkeys.h

obs = obslua
ffi = require("ffi")

-- constants
if ffi.os == "Windows" then
	SUPER_KEY = "Win"
	RETURN_KEY = "Enter"
elseif ffi.os == "OSX" then
	SUPER_KEY = "Cmd"
	RETURN_KEY = "Return"
else
	SUPER_KEY = "Super"
	RETURN_KEY = "Return"
end

KEYBOARD_LAYOUT = { -- ind = true means that the key can be a standalone hotkey
{id = "MB1", jsn = "OBS_KEY_MOUSE1", txt = "MB1", ind = true, type = false},
{id = "MB2", jsn = "OBS_KEY_MOUSE2", txt = "MB2", ind = true, type = false},
{id = "MB3", jsn = "OBS_KEY_MOUSE3", txt = "MB3", ind = true, type = false},
{id = "MB4", jsn = "OBS_KEY_MOUSE4", txt = "MB4", ind = true, type = false},
{id = "MB5", jsn = "OBS_KEY_MOUSE5", txt = "MB5", ind = true, type = false},
{id = "MB6", jsn = "OBS_KEY_MOUSE6", txt = "MB6", ind = true, type = false},
{id = "MB7", jsn = "OBS_KEY_MOUSE7", txt = "MB7", ind = true, type = false},
{id = "MB8", jsn = "OBS_KEY_MOUSE8", txt = "MB8", ind = true, type = false},
{id = "MB9", jsn = "OBS_KEY_MOUSE9", txt = "MB9", ind = true, type = false},
{id = "MB10", jsn = "OBS_KEY_MOUSE10", txt = "MB10", ind = true, type = false},
{id = "MB11", jsn = "OBS_KEY_MOUSE11", txt = "MB11", ind = true, type = false},
{id = "MB12", jsn = "OBS_KEY_MOUSE12", txt = "MB12", ind = true, type = false},
{id = "MB13", jsn = "OBS_KEY_MOUSE13", txt = "MB13", ind = true, type = false},
{id = "MB14", jsn = "OBS_KEY_MOUSE14", txt = "MB14", ind = true, type = false},
{id = "MB15", jsn = "OBS_KEY_MOUSE15", txt = "MB15", ind = true, type = false},
{id = "MB16", jsn = "OBS_KEY_MOUSE16", txt = "MB16", ind = true, type = false},
{id = "MB17", jsn = "OBS_KEY_MOUSE17", txt = "MB17", ind = true, type = false},
{id = "MB18", jsn = "OBS_KEY_MOUSE18", txt = "MB18", ind = true, type = false},
{id = "MB19", jsn = "OBS_KEY_MOUSE19", txt = "MB19", ind = true, type = false},
{id = "MB20", jsn = "OBS_KEY_MOUSE20", txt = "MB20", ind = true, type = false},
{id = "MB21", jsn = "OBS_KEY_MOUSE21", txt = "MB21", ind = true, type = false},
{id = "MB22", jsn = "OBS_KEY_MOUSE22", txt = "MB22", ind = true, type = false},
{id = "MB23", jsn = "OBS_KEY_MOUSE23", txt = "MB23", ind = true, type = false},
{id = "MB24", jsn = "OBS_KEY_MOUSE24", txt = "MB24", ind = true, type = false},
{id = "MB25", jsn = "OBS_KEY_MOUSE25", txt = "MB25", ind = true, type = false},
{id = "MB26", jsn = "OBS_KEY_MOUSE26", txt = "MB26", ind = true, type = false},
{id = "MB27", jsn = "OBS_KEY_MOUSE27", txt = "MB27", ind = true, type = false},
{id = "MB28", jsn = "OBS_KEY_MOUSE28", txt = "MB28", ind = true, type = false},
{id = "MB29", jsn = "OBS_KEY_MOUSE29", txt = "MB29", ind = true, type = false},
}

SHORTCUT_COMBO = {
{id = "_", jsn = ""}, -- for ind = true keys in KEYBOARD_LAYOUT
{id = "_SHIFT_", jsn = ", \"shift\": true", txt = "Shift"}, -- for ind = true keys in KEYBOARD_LAYOUT
{id = "_CTRL_", jsn = ", \"control\": true", txt = "Ctrl"},
{id = "_CTRL_SHIFT_", jsn = ", \"control\": true, \"shift\": true", txt = "Ctrl+Shift"},
{id = "_CTRL_ALT_", jsn = ", \"control\": true, \"alt\": true", txt = "Ctrl+Alt"},
{id = "_CTRL_ALT_SHIFT_", jsn = ", \"control\": true, \"alt\": true, \"shift\": true", txt = "Ctrl+Alt+Shift"},
{id = "_ALT_", jsn = ", \"alt\": true", txt = "Alt"},
{id = "_ALT_SHIFT_", jsn = ", \"alt\": true, \"shift\": true", txt = "Alt+Shift"},
{id = "_CMD_", jsn = ", \"command\": true", txt = SUPER_KEY},
{id = "_CMD_SHIFT_", jsn = ", \"command\": true, \"shift\": true", txt = SUPER_KEY .. "+Shift"},
}

JSON_DATA = "{"
KEY_FORM = "\"SHOWHTK%s%s\": [{\"key\": \"%s\"%s}]%s"
for k1,v1 in pairs(SHORTCUT_COMBO) do
	for k2,v2 in pairs(KEYBOARD_LAYOUT) do
		local htk_text
		--If no modifier Key pressed
		if v1.id == "_" then
			if not v2.ind then goto continue end
			htk_text = v2.txt
		elseif v1.id == "_SHIFT_" then
			if not v2.ind then goto continue end
			if v2.type then htk_text = v2.shiftTxt 
			else htk_text = v1.txt .. "+" .. v2.txt
			end
		else
			htk_text = v1.txt .. "+" .. v2.txt
		end

		-- final absense of comma is apparently important in obs_data_create_from_json
		local comma
		if k1 == table.getn(SHORTCUT_COMBO) and k2 == table.getn(KEYBOARD_LAYOUT) then
			comma = ""
		else
			comma = ","
		end

		JSON_DATA = JSON_DATA .. KEY_FORM:format(v1.id, v2.id, v2.jsn, v1.jsn, comma)
		_G["SHOWHTK" .. v1.id .. v2.id] = function(pressed)
			if pressed then
				obs.timer_remove(remove_asterisk)
				obs.timer_remove(clear_text)
				g_source_text = htk_text
				update_text("" .. htk_text)
				obs.timer_add(remove_asterisk, ASTERISK_DUR)
				obs.timer_add(clear_text, g_stay_seconds * 1000)
			end
		end
	::continue:: end
end
JSON_DATA = JSON_DATA .. "}"

ASTERISK_DUR = 300 -- asterisk signifies 'fresh' hotkey

-- global variables
g_source_name = ""
g_source_text = ""
g_stay_seconds = 3
g_is_activated = true -- TODO: use

----------------------------------------------------------

function update_text(text)
	local source = obs.obs_get_source_by_name(g_source_name)
	if source ~= nil then
		local settings = obs.obs_data_create()
		obs.obs_data_set_string(settings, "text", text)
		obs.obs_source_update(source, settings)
		obs.obs_data_release(settings)
		obs.obs_source_release(source)
	end
end

function remove_asterisk()
	obs.remove_current_callback()

	update_text(g_source_text)
end

function clear_text()
	obs.remove_current_callback()

	local source = obs.obs_get_source_by_name(g_source_name)
	source_id = obs.obs_source_get_unversioned_id(source)

	if source_id == "text_ft2_source" then
		update_text(" ") -- OBS can't set empty string to ft2
	else
		update_text("")
	end

	obs.obs_source_release(source)
end

----------------------------------------------------------

-- a function named script_load will be called on startup
function script_load(settings)
	local jsn = obs.obs_data_create_from_json(JSON_DATA)

	for _,v1 in pairs(SHORTCUT_COMBO) do
		for _,v2 in pairs(KEYBOARD_LAYOUT) do
			if (v1.id == "_" or v1.id == "_SHIFT_") and not v2.ind then goto continue end
			reg_hotkey(jsn, "SHOWHTK" .. v1.id .. v2.id)
		::continue:: end
	end

	obs.obs_data_release(jsn)
end

-- auxiliary function to script_load to register hotkey
function reg_hotkey(jsn, name_htk)
	local arr = obs.obs_data_get_array(jsn, name_htk)
	local htk = obs.obs_hotkey_register_frontend(script_path() .. name_htk, name_htk, _G[name_htk])
	obs.obs_hotkey_load(htk, arr)
	obs.obs_data_array_release(arr)
end

-- A function named script_description returns the description shown to
-- the user
function script_description()
	return "Show pressed key or mouse button\nSelect a Text Source to store the key."
end

-- A function named script_properties defines the properties that the user
-- can change for the entire script module itself
function script_properties()
	local props = obs.obs_properties_create()
	obs.obs_properties_add_int(props, "duration", "Duration (seconds)", 1, 10, 1)

	local p = obs.obs_properties_add_list(props, "source", "Text Source", obs.OBS_COMBO_TYPE_EDITABLE, obs.OBS_COMBO_FORMAT_STRING)
	local sources = obs.obs_enum_sources()
	if sources ~= nil then
		for _, source in ipairs(sources) do
			source_id = obs.obs_source_get_unversioned_id(source)
			if source_id == "text_gdiplus" or source_id == "text_ft2_source" then
				local name = obs.obs_source_get_name(source)
				obs.obs_property_list_add_string(p, name, name)
			end
		end
	end
	obs.source_list_release(sources)

	return props
end

-- A function named script_update will be called when settings are changed
function script_update(settings)
	g_stay_seconds = obs.obs_data_get_int(settings, "duration")
	g_source_name = obs.obs_data_get_string(settings, "source")
end

-- A function named script_defaults will be called to set the default settings
function script_defaults(settings)
	obs.obs_data_set_default_int(settings, "duration", 3)
end